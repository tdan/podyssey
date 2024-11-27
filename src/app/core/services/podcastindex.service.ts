import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS  from 'crypto-js';
import { Episode } from '../models/episode.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL: string = 'https://api.podcastindex.org/api/1.0/';
const API_KEY: string = 'BX8FXM5ZSEG28M5JLA43';
const API_SERCRET: string = 'aTVM4Rc8sxVWEUvx69WWnGdBpcmEux$XscH#scuG';

@Injectable({
  providedIn: 'root',
})
export class PodcastIndexService {

  public constructor(private httpClient: HttpClient) {}

  public getRecentEpisodes(max: number = 7): Observable<any> {
    let authHeaders: HttpHeaders = this.prepareAuthHeaders();

    let source$: Observable<any> = this.httpClient.
      get(API_URL + '/recent/episodes?max=' + max, {headers: authHeaders});

    return source$.pipe(map(data => {
      return data.items;
    }));
  }

  private prepareAuthHeaders(): HttpHeaders {
    let epochHeaderTime = Math.floor(Date.now() / 1000);

    let hashAuthToken = CryptoJS.SHA1(API_KEY + API_SERCRET + epochHeaderTime).toString();

    return new HttpHeaders().
      set('User-Agent', 'antennapod-web').
      set('X-Auth-Key', API_KEY).
      set('X-Auth-Date', epochHeaderTime.toString()).
      set('Authorization', hashAuthToken);
  }

  public getEpisodeById(id: number): Observable<Episode> {
    let authHeaders: HttpHeaders = this.prepareAuthHeaders();

    let source$: Observable<any> = this.httpClient.
      get(API_URL + '/episodes/byid?id=' + id + '&pretty', {headers:authHeaders});

    return source$.pipe(map(data => {
      return new Episode(
        data.episode.id,
        data.episode.title,
        data.episode.datePublishedPretty,
        data.episode.duration,
        data.episode.description,
        data.episode.enclosureUrl
      );
    }));
  }
}
