import { Observable } from "rxjs/internal/Observable";
import { Episode } from "../models/episode.model";
import { Podcast } from "../models/podcast.model";
import { Injectable } from "@angular/core";
import { PodchaserService } from "./podchaser.service";
import { PodcastIndexService } from "./podcastindex.service";

@Injectable({
  providedIn: "root",
  useClass: PodcastIndexService,
})
export abstract class PodcastAPIService {

  /**
   * Get list of episodes that belongs to a podcast
   *
   * @param feedID - Podcast/Feed id
   * @returns episodes
   *
   */
  abstract getEpisodesInPodcast(podcastId: number | string, options?: {}): Observable<Episode[]>;

  /**
   * Get episode by id.
   *
   * @param id - Episode id
   * @returns Podcast episode that has `id`
   *
   */
  abstract getEpisodeById(id: number | string): Observable<Episode>;

  /**
   * Get all podcasts that match the search terms in title, author or owner
   *
   * @param query - search terms
   * @returns Podcasts that match terms in `query`
   *
   */
  abstract getPodcastsByTerm(query: {} | string): Observable<Podcast[]>;

  /**
   * @param [max=10] Maximum number of result to returns. Default = 10
   * @return the podcasts/feeds that in the index that are trending.
   */
  abstract getTrendingPodcasts(max: number): Observable<Podcast[]>;

}


// TODO: Need to add a Filters class/interface to filter episodes,
// to make sure get is consistent between different API service
