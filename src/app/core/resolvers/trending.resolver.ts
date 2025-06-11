import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Podcast } from "../models/podcast.model";
import { PodcastIndexService } from "../services/podcastindex.service";
import { Observable } from "rxjs";
import { PodcastAPIService } from "../services/podcast_api.service";
import { PodchaserService } from "../services/podchaser.service";

@Injectable({
  providedIn: "root"
})
export class TrendingPodcastsResolver implements Resolve<Podcast[]> {

  // TODO: DI issue: using abstract PodcastAPIService doesn't work in this case
  // need to figure out why?
  constructor(private podcastService: PodchaserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Podcast[]> {

    return this.podcastService.getTrendingPodcasts(10);
  }

}
