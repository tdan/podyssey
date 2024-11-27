import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StreamEpisodeService } from './core/services/streamepisode.service';
import { Subscription } from 'rxjs';
import { StreamState } from './core/models/stream-state.interface';
import { EpisodeTimeFormatPipe } from "./episodetimeformat.pipe";

const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatSliderModule,
  MatIconModule,
  MatListModule,
];

@Component({
  selector: 'sticky-player',
  standalone: true,
  templateUrl: './stickyplayer.component.html',
  styleUrl: './stickyplayer.component.css',
  imports: [modules, EpisodeTimeFormatPipe],
  providers: [EpisodeTimeFormatPipe],
})
export class StickyPlayerComponent implements OnDestroy {
  public state: StreamState = {
    playing: false,
    currentTime: 0,
    readableCurrentTime: "",
    duration: 0,
    readableDuration: "",
    isPlayable: false,
  };

  private streamObserver: Subscription;

  constructor(private streamEpisodeService: StreamEpisodeService) {
    this.streamObserver = streamEpisodeService.getState().subscribe((value) => {
      this.state = value;
    });
  }

  public ngOnDestroy(): void {
    this.streamObserver.unsubscribe();
  }

  public startStream () {}

  public play() {
    this.streamEpisodeService.play();
    console.log("[StickyPlayerComponent.play]")
    console.log(this.state);
  }

  public pause() {
    this.streamEpisodeService.pause();
    console.log("[StickyPlayerComponent.pause]")
    console.log(this.state);
  }
}
