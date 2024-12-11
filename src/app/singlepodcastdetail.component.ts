import { Component, OnInit } from "@angular/core";
import { Podcast } from "./core/models/podcast.model";
import { PodcastIndexService } from "./core/services/podcastindex.service";
import { ActivatedRoute } from "@angular/router";
import { EpisodesListComponent } from "./episodeslist.component";
import { Episode } from "./core/models/episode.model";

@Component({
  standalone: true,
  selector: "single-podcast-detail",
  templateUrl: "./singlepodcastdetail.component.html",
  styleUrl: "./singlepodcastdetail.component.css",
  imports: [EpisodesListComponent],
})
export class SinglePodcastDetailComponent implements OnInit {
  // private podcast: Podcast;
  episodes: Episode[] = [];

  constructor(
    private podcastIdxApi: PodcastIndexService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const podcastId: number = Number(this.route.snapshot.paramMap.get("id"));
    console.log(podcastId);
    this.podcastIdxApi.getEpisodesInPodcast(podcastId).subscribe(data => {
      this.episodes = data;
    });
  }

}
