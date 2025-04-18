import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS  from 'crypto-js';
import { Episode } from '../models/episode.model';
import { Podcast } from '../models/podcast.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import PodcastIndexClient from "podcastdx-client";
import { env } from "../../../environments/environment";

const API_URL: string = env['PODCAST_IDX_API_URL'];
const API_KEY: string = env['PODCAST_IDX_API_KEY'];
const API_SECRET: string = env['PODCAST_IDX_API_SECRET'];

@Injectable({
  providedIn: 'root',
})
export class PodcastIndexService {

  /** PodcastIndexClient currently not working due to process is undefined
   ** error with mixpanel.js
   **/
  // private client:PodcastIndexClient;
  private authHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.authHeaders = this.prepareAuthHeaders();
  }

  public getRecentEpisodes(max: number = 7): Observable<any> {

    let response$: Observable<any> = this.httpClient.
      get(API_URL + '/recent/episodes?max=' + max, {headers: this.authHeaders});

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

    let response$: Observable<any> = this.httpClient.
      get(API_URL + '/episodes/byfeedid?id=' + feedID + '&pretty', {headers: this.authHeaders});

    return response$.pipe(
      map(data => {
        let episodesList: Episode[] = [];
        data.items.forEach(item => {
          episodesList.push({
            id: item.id,
            guid: item.guid,
            title: item.title,
            description: item.description,
            datePublished: item.datePublishedPretty,
            duration: item.duration,
            url: item.enclosureUrl,
            imageUrl: item.feedImage,
          } as Episode);
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

    let response$: Observable<any> = this.httpClient.
      get(API_URL + '/episodes/byid?id=' + id + '&pretty', {headers: this.authHeaders});

    return response$.pipe(map(data => {
      return {
        id: data.episode.id,
        guid: data.episode.guid,
        title: data.episode.title,
        description: data.episode.description,
        datePublished: data.episode.datePublishedPretty,
        duration: data.episode.duration,
        url: data.episode.enclosureUrl,
        imageUrl: data.episode.feedImage,
      } as Episode;
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

    let response$: Observable<any> = this.httpClient.
      get(API_URL + "/search/byterm?q=" + query + "&pretty", {headers: this.authHeaders});

    return response$.pipe(
      map(data => {
        let podcastList: Podcast[] = [];
        data.feeds.forEach(feed => {
          podcastList.push({
            id: feed.id,
            guid: feed.guid,
            title: feed.title,
            author: feed.author,
            description: feed.description,
            url: feed.link,
            imageUrl: feed.image,
          } as Podcast);
        });
        return podcastList;
      })
    );
  }

  /**
   * @param [max=10] Maximum number of result to returns. Default = 10
   * @return the podcasts/feeds that in the index that are trending.
   */
  public getTrendingPodcasts(max: number = 10): Observable<Podcast[]> {

    let response$: Observable<any> = this.httpClient.
      get(API_URL + "/podcasts/trending?max=" + max + "&pretty", { headers: this.authHeaders });

    return response$.pipe(
      map(data => {
        let podcastList: Podcast[] = [];
        data.feeds.forEach(feed => {
          podcastList.push({
            id: feed.id,
            guid: feed.guid,
            title: feed.title,
            author: feed.author,
            description: feed.description,
            url: feed.link,
            imageUrl: feed.image,
          } as Podcast);
        });
        return podcastList;
      }),
    );

  }


  private prepareAuthHeaders(): HttpHeaders {
    let epochHeaderTime = Math.floor(Date.now() / 1000);

    let hashAuthToken = CryptoJS.SHA1(API_KEY + API_SECRET + epochHeaderTime).toString();

    return new HttpHeaders().
      set('User-Agent', 'podyssey').
      set('X-Auth-Key', API_KEY).
      set('X-Auth-Date', epochHeaderTime.toString()).
      set('Authorization', hashAuthToken);
  }
}
