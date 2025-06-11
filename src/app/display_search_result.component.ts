import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PodcastIndexService } from "./core/services/podcastindex.service";
import { PodcastsListComponent } from "./podcastslist.component";
import { Podcast } from "./core/models/podcast.model";

@Component({
    selector: "search-result-display",
    templateUrl: "./display_search_result.component.html",
    styleUrl: "./display_search_result.component.css",
    imports: [PodcastsListComponent]
})
export class DisplaySearchResultComponent implements OnInit {
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
