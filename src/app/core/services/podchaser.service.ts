import { Observable } from "rxjs";
import { Episode } from "../models/episode.model";
import { Podcast } from "../models/podcast.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { env } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { PodcastAPIService } from "./podcast_api.service";

const BEARER_TOKEN: string = env["PODCHASER_API_TOKEN"];
const API_URL: string = env["PODCHASE_API_URL"];

enum PodcastIdentifierType {
  APPLE_PODCASTS,
  SPOTIFY,
  RSS,
  PODCHASER,
}

enum PodcastSortType {
  ALPHABETICAL,
  RELEVANCE,
  TRENDING,
  RATING,
  DATE_OF_FIRST_EPISODE,
  FOLLOWER_COUNT,
  POWER_SCORE,
}

enum SortDirection {
  ASCENDING,
  DESCENDING
}

@Injectable({
  providedIn: "root"
})
export class PodchaserService implements PodcastAPIService {

  private authHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.authHeaders = this.prepareHeaders();
  }

  public getEpisodesInPodcast(podcastId: number | string, options?: {}): Observable<Episode[]> {

    const body = JSON.stringify({
      query: `query getPodcast($id: PodcastIdentifier!) {
                podcast(identifier: $id) {
                  episodes { data { id, guid, title, description, audioUrl, imageUrl, length } }
                }
              }`,
      variables: {
        id: {
          id: podcastId.toString(),
          type: "PODCHASER",
        },
      }
    });

    let response$: Observable<any> = this.httpClient.
      post(API_URL, body, { headers: this.authHeaders });


    return response$.pipe(
      map( result => {
        let episodesList: Episode[] = [];

        result["data"]["podcast"]["episodes"]["data"]
          .forEach(item => {
            episodesList.push({
              id: item.id,
              guid: item.guid,
              title: item.title,
              description: item.description,
              datePublished: item.airDate,
              duration: item.length,
              url: item.audioUrl,
              imageUrl: item.imageUrl,
            } as Episode);
          }
        );
        return episodesList;
      })
    );
  }
  public getEpisodeById(id: number): Observable<Episode> {
    throw new Error("Method not implemented.");
  }

  public getPodcastsByTerm(query: {} | string): Observable<Podcast[]> {

    const body = JSON.stringify({
      query: `query getPodcasts($filters: PodcastFilters!) {
                podcasts(filters: $filters) {
                  data { id, title, description, url, imageUrl }
                }
              }`,
      variables: {
        filters: query,
      },
    });

    let response$: Observable<any> = this.httpClient
        .post(API_URL, body, { headers: this.authHeaders,});

    return response$.pipe(
      map( result => {
        let podcastsList: Podcast[] = [];

        result.data.podcasts.data.forEach(item => {
          podcastsList.push({
            id: item.id,
            title: item.title,
            description: item.description,
            url: item.url,
            imageUrl: item.imageUrl,
          } as Podcast);
        });

        return podcastsList;
      }),
    );

  }

  public getTrendingPodcasts(max: number): Observable<Podcast[]> {

    const body = JSON.stringify({
      query: `query getPodcasts(
                $first: Int,
                $sort: PodcastSort,
              ) {
                podcasts(first: $first, sort: $sort) {
                  data { id, title, description, url, imageUrl }
                }
              }`,
      variables: {
        first: max,
        sort: {
          sortBy: "TRENDING",
          direction: "DESCENDING",
        }
      },
    });

    let response$: Observable<any> = this.httpClient.
      post(API_URL, body, { headers: this.authHeaders, });

    return response$.pipe(
      map(result => {
        let podcastList: Podcast[] = [];

        result.data.podcasts.data.forEach(item => {
          podcastList.push({
            id: item.id,
            title: item.title,
            description: item.description,
            url: item.url,
            imageUrl: item.imageUrl,
          } as Podcast);
        });

        return podcastList;
      }),
    );
  }

  private prepareHeaders(): HttpHeaders {
    return new HttpHeaders().
      set("Authorization", "Bearer " + BEARER_TOKEN).
      set("Content-type", "application/json").
      set("Accept", "application/graphql-response+json");
  }
}
