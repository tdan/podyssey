import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS  from 'crypto-js';
import { Episode } from '../models/episode.model';
import { Podcast } from '../models/podcast.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import PodcastIndexClient from "podcastdx-client";
import { process } from "../../../environments/environment";

const API_URL: string = process?.env['PODCAST_IDX_API_URL'] ?? "";
const API_KEY: string = process?.env['PODCAST_IDX_API_KEY'] ?? "";
const API_SECRET: string = process?.env['PODCAST_IDX_API_SECRET'] ?? "";

@Injectable({
  providedIn: 'root',
})
export class PodcastIndexService {

  /** PodcastIndexClient currently not working due to process is undefined
   ** error with mixpanel.js
   **/
  // private client:PodcastIndexClient;

  public constructor(private httpClient: HttpClient) {}

  public getRecentEpisodes(max: number = 7): Observable<any> {
    let authHeaders: HttpHeaders = this.prepareAuthHeaders();

    let response$: Observable<any> = this.httpClient.
      get(API_URL + '/recent/episodes?max=' + max, {headers: authHeaders});

    return response$.pipe(map(data => {
      return data.items;
    }));
  }

  /**
   * Get list of episodes that belongs to a podcast
   *
   * @param feedID - Podcast/Feed id
   * @returns episodes
   *
   */
  public getEpisodesInPodcast(feedID: number): Observable<Episode[]> {
    let authHeaders: HttpHeaders = this.prepareAuthHeaders();

    let response$: Observable<any> = this.httpClient.
      get(API_URL + '/episodes/byfeedid?id=' + feedID + '&pretty', {headers:authHeaders});

    return response$.pipe(
      map(data => {
        console.log(data);
        let episodesList: Episode[] = [];
        data.items.forEach(item => {
          episodesList.push(new Episode(
            item.id,
            item.guid,
            item.title,
            item.description,
            item.datePublishedPretty,
            item.duration,
            item.enclosureUrl,
            item.feedImage,
          ));
        });
        return episodesList;
      })
    );
  }

  /**
   * Get episode by id.
   *
   * @param id - Episode id
   * @returns Podcast episode that has `id`
   *
   */
  public getEpisodeById(id: number): Observable<Episode> {
    let authHeaders: HttpHeaders = this.prepareAuthHeaders();


    let response$: Observable<any> = this.httpClient.
      get(API_URL + '/episodes/byid?id=' + id + '&pretty', {headers:authHeaders});

    return response$.pipe(map(data => {
      return new Episode(
        data.episode.id,
        data.episode.guid,
        data.episode.title,
        data.episode.description,
        data.episode.datePublishedPretty,
        data.episode.duration,
        data.episode.enclosureUrl,
        data.episode.feedImage
      );
    }));
  }

  /**
   * Get all podcasts that match the search terms in title, author or owner
   *
   * @param query - search terms
   * @returns Podcasts that match terms in `query`
   *
   */
  public getPodcastsbyTerm(query: string): Observable<Podcast[]> {
    let authHeaders: HttpHeaders = this.prepareAuthHeaders();

    let response$: Observable<any> = this.httpClient.
      get(API_URL + "/search/byterm?q=" + query + "&pretty", {headers: authHeaders});

    return response$.pipe(
      map(data => {
        let podcastList: Podcast[] = [];
        data.feeds.forEach(feed => {
          podcastList.push(new Podcast(
            feed.id,
            feed.guid,
            feed.title,
            feed.author,
            feed.description,
            feed.link,
            feed.link,
            feed.image,
          ));
        });
        return podcastList;
      })
    );
  }

  private prepareAuthHeaders(): HttpHeaders {
    let epochHeaderTime = Math.floor(Date.now() / 1000);

    let hashAuthToken = CryptoJS.SHA1(API_KEY + API_SECRET + epochHeaderTime).toString();

    return new HttpHeaders().
      set('User-Agent', 'antennapod-web').
      set('X-Auth-Key', API_KEY).
      set('X-Auth-Date', epochHeaderTime.toString()).
      set('Authorization', hashAuthToken);
  }
}
