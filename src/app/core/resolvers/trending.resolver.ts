import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Podcast } from "../models/podcast.model";
import { Observable } from "rxjs";
import { PodcastAPIService } from "../services/podcast_api.service";

@Injectable({
  providedIn: "root"
})
export class TrendingPodcastsResolver implements Resolve<Podcast[]> {

  constructor(private podcastService: PodcastAPIService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Podcast[]> {

    return this.podcastService.getTrendingPodcasts(10);
  }

}
