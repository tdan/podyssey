import { Injectable } from "@angular/core";
import { PodcastIndexService } from "../services/podcastindex.service";
import { Podcast } from "../models/podcast.model";

@Injectable({
  providedIn: "root",
})
export class AppController {

  constructor(private podcastIndexService: PodcastIndexService) {}

  public getTrendingPodcasts(): Podcast[] {

    let trendingPodcasts: Podcast[] = [];

    this.podcastIndexService
      .getTrendingPodcasts()
      .subscribe(data => {
        trendingPodcasts = data;
      });

    return trendingPodcasts;
  }
}
