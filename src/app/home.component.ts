import { Component } from "@angular/core";
import { PodcastsListComponent } from "./podcastslist.component";
import { SearchBoxComponent } from "./searchbox.component";

@Component({
  selector: "home-page",
  standalone: true,
  imports: [PodcastsListComponent, SearchBoxComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  podcastResults: any[] = [];

  constructor(){}

  onPodcastSearchResults(event: any[]) {
     this.podcastResults = event;
  }
}
