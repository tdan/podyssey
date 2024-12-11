import { Component, Input } from "@angular/core";
import { Podcast } from "./core/models/podcast.model";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";

const MatModules = [
  MatGridListModule,
  MatListModule,
  MatCardModule,
];

@Component({
  standalone: true,
  selector: 'podcasts-list',
  templateUrl: './podcastslist.component.html',
  styleUrls: ['./podcastslist.component.css'],
  imports: [MatModules],
})
export class PodcastsListComponent {
  @Input() podcasts: Podcast[];

  constructor() {
    this.podcasts = [];
  }
}
