import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Podcast } from "../models/podcast.model";
import { PodcastIndexService } from "../services/podcastindex.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TrendingPodcastsResolver implements Resolve<Podcast[]> {

  constructor(private podcastIndexService: PodcastIndexService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Podcast[]> {

    return this.podcastIndexService.getTrendingPodcasts()
  }

}
