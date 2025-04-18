import { Component, Input, OnInit } from "@angular/core";
import { PlayEpisodeButtonComponent } from "./play_episode_button.component";
import { EpisodeState } from "./core/models/episode_state.interface";

@Component({
    selector: 'episode-states-list',
    templateUrl: './episodestatelist.component.html',
    styleUrls: ['./episodestatelist.component.css'],
    imports: [ PlayEpisodeButtonComponent]
})
export class EpisodeStateListComponent implements OnInit {
  @Input() episodeStates: EpisodeState[];

  constructor() {
    this.episodeStates = [];
  }

  public ngOnInit(): void {}
}
