import { Component } from "@angular/core";
import { PodcastsListComponent } from "./podcastslist.component";
import { Podcast } from "./core/models/podcast.model";
import { ActivatedRoute } from "@angular/router";
import { PodcastAPIService } from "./core/services/podcast_api.service";

@Component({
  templateUrl: "./display_category.component.html",
  styleUrl: "./display_category.component.css",
  imports: [PodcastsListComponent,]
})
export class DisplayCategoryComponent {
  podcasts: Podcast[];

  constructor(
    private podcastAPI: PodcastAPIService,
    private route: ActivatedRoute,
  ) {
    this.podcasts = [];
  }

  ngOnInit() {

    const catSlug: string | null = this.route.snapshot.paramMap.get("slug");

    this.podcastAPI.getPodcastsByTerm({"categories": catSlug})
      .subscribe( data => {
        this.podcasts = data;
      });
  }
}
