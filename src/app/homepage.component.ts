import { Component } from "@angular/core";
import { Podcast } from "./core/models/podcast.model";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { SubscribePodcastButtonComponent } from "./subscribe_podcast_button.component";

@Component({
    selector: "home-page",
    templateUrl: "./homepage.component.html",
    styleUrl: "./homepage.component.css",
    imports: [RouterLink, SubscribePodcastButtonComponent]
})
export class HomepageComponent {
  public trending: Podcast[];

  constructor(private route: ActivatedRoute) {
    this.trending = [];
  }

  public ngOnInit() {
    this.trending = this.route.snapshot.data["trending"];
  }
}
