import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PodcastIndexService } from "./core/services/podcastindex.service";
import { PodcastsListComponent } from "./podcastslist.component";
import { Podcast } from "./core/models/podcast.model";

@Component({
  selector: "search-result-display",
  standalone: true,
  templateUrl: "./search_result_display.component.html",
  styleUrl: "./search_result_display.component.css",
  imports: [PodcastsListComponent],
})
export class SearchResultDisplayComponent implements OnInit {
  public results: Podcast[];

  constructor(
    private route: ActivatedRoute,
    private podcastApi: PodcastIndexService
  ) {
    this.results = [];
  }

  public ngOnInit(): void {
    let query: string = this.route.snapshot.queryParams["term"];

    this.podcastApi.getPodcastsbyTerm(query)
      .subscribe(response => {
        this.results = response;
      });
  }
}
