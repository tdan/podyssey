import { Component, Input } from "@angular/core";
import { StreamEpisodeService } from "./core/services/streamepisode.service";
import { Episode } from "./core/models/episode.model";

@Component({
  selector: "play-episode-button",
  standalone: true,
  templateUrl: "./play_episode_button.component.html",
  styleUrl: "./play_episode_button.component.css",
})
export class PlayEpisodeButtonComponent {
  @Input() episode!: Episode;

  constructor(
    private streamEpisodeService: StreamEpisodeService,
  ) {}

  public play() {
    this.streamEpisodeService.startStream(this.episode)
      .subscribe(events => {});
  }
}
