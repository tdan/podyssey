import { Component } from "@angular/core";
import { Podcast } from "./core/models/podcast.model";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "side-bar",
    templateUrl: "./sidebar.component.html",
    styleUrl: "./sidebar.component.css",
    imports: [RouterLink, RouterLinkActive]
})
export class SidebarComponent {
  // TODO: Find a way to reuse `PodcastListComponent` to
  // render favorite podcasts
  public subscribedPodcasts: Podcast[] = [];
}
