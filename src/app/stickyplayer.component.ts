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
import { FormsModule } from '@angular/forms';

const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatSliderModule,
  MatIconModule,
  MatListModule,
  FormsModule,
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

  public sliderValue = this.state.currentTime;
  public sliderMax = this.state.duration;

  private streamObserver: Subscription;

  constructor(private streamEpisodeService: StreamEpisodeService) {
    this.streamObserver = streamEpisodeService.getState().subscribe((value) => {
      this.state = value;
      // this.sliderValue = this.state.currentTime;
      // this.sliderMax = this.state.duration;
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

  public seek(seconds: number) {
    this.streamEpisodeService.seekTo(this.state.currentTime + seconds);
  }

  public seekTo(value: number | string) {
    const destinationTimeInSeconds = Number(value);
    this.streamEpisodeService.seekTo(destinationTimeInSeconds);
  }
}
