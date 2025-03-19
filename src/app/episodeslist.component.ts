import { Component, Input, OnInit } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { PlayEpisodeButtonComponent } from "./play_episode_button.component";
import { Episode } from "./core/models/episode.model";

const MatModules = [
  MatListModule,
  MatIconModule,
  MatPaginatorModule,
];

@Component({
  standalone: true,
  selector: 'episodes-list',
  templateUrl: './episodeslist.component.html',
  styleUrls: ['./episodeslist.component.css'],
  imports: [MatModules, PlayEpisodeButtonComponent],
})
export class EpisodesListComponent implements OnInit {
  @Input() episodes: Episode[];

  constructor() {
    this.episodes = [];
  }

  public ngOnInit(): void {}
}
