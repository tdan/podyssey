import { Component, Input, OnInit } from "@angular/core";
import { PodcastIndexService } from '../app/core/services/podcastindex.service';
import { Episode } from './core/models/episode.model';
import { StreamEpisodeService } from "./core/services/streamepisode.service";
import { MatListModule } from "@angular/material/list";

const MatModules = [
  MatListModule,
];

@Component({
  standalone: true,
  selector: 'episodes-list',
  templateUrl: './episodeslist.component.html',
  styleUrls: ['./episodeslist.component.css'],
  imports: [MatModules],
})
export class EpisodesListComponent implements OnInit {
  @Input() episodes: Episode[];

  constructor(
    private podcastAPI: PodcastIndexService,
    private streamEpisodeService: StreamEpisodeService
  ) {
    this.episodes = [];
  }

  public ngOnInit(): void {}

  public onEpisodeSelected(ep: Episode) {
    this.podcastAPI.getEpisodeById(ep.id).subscribe((episode: Episode) => {
      this.streamEpisodeService.startStream(episode).subscribe(events => {});
    });
  }
}
