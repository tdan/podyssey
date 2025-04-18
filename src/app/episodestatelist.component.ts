import { Component, Input, OnInit } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { PlayEpisodeButtonComponent } from "./play_episode_button.component";
import { EpisodeState } from "./core/models/episode_state.interface";

const MatModules = [
  MatListModule,
  MatIconModule,
  MatPaginatorModule,
];

@Component({
    selector: 'episode-states-list',
    templateUrl: './episodestatelist.component.html',
    styleUrls: ['./episodestatelist.component.css'],
    imports: [MatModules, PlayEpisodeButtonComponent]
})
export class EpisodeStateListComponent implements OnInit {
  @Input() episodeStates: EpisodeState[];

  constructor() {
    this.episodeStates = [];
  }

  public ngOnInit(): void {}
}
