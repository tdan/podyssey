import { Component, Input, OnInit } from "@angular/core";
import { PlayEpisodeButtonComponent } from "./play_episode_button.component";
import { Episode } from "./core/models/episode.model";

@Component({
    selector: 'episodes-list',
    templateUrl: './episodeslist.component.html',
    styleUrls: ['./episodeslist.component.css'],
    imports: [ PlayEpisodeButtonComponent]
})
export class EpisodesListComponent implements OnInit {
  @Input() episodes: Episode[];

  constructor() {
    this.episodes = [];
  }

  public ngOnInit(): void {}
}
