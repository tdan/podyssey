import { Component, Input } from "@angular/core";
import { Podcast } from "./core/models/podcast.model";
import { SubscribePodcastButtonComponent } from "./subscribe_podcast_button.component";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  standalone: true,
  selector: 'podcasts-list',
  templateUrl: './podcastslist.component.html',
  styleUrls: ['./podcastslist.component.css'],
  imports: [RouterLink, RouterLinkActive, SubscribePodcastButtonComponent],
})
export class PodcastsListComponent {
  @Input() podcasts: Podcast[];

  constructor() {
    this.podcasts = [];
  }
}
