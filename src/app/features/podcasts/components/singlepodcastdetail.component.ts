import { Component, OnInit } from "@angular/core";
import { PodcastIndexService } from "./core/services/podcastindex.service";
import { ActivatedRoute } from "@angular/router";
import { EpisodesListComponent } from "./episodeslist.component";
import { Episode } from "./core/models/episode.model";
import { PodcastAPIService } from "./core/services/podcast_api.service";

@Component({
    selector: "single-podcast-detail",
    templateUrl: "./singlepodcastdetail.component.html",
    styleUrl: "./singlepodcastdetail.component.css",
    imports: [EpisodesListComponent]
})
export class SinglePodcastDetailComponent implements OnInit {
  episodes: Episode[] = [];

  constructor(
    private podcastApi: PodcastAPIService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {

    const podcastId: number = Number(this.route.snapshot.paramMap.get("id"));

    this.podcastApi.getEpisodesInPodcast(podcastId)
      .subscribe(data => {
        this.episodes = data;
      }
    );
  }

}
