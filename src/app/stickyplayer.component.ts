import { Component, ElementRef, OnDestroy, ViewChild, effect, signal } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StreamEpisodeService } from './core/services/streamepisode.service';
import { Subscription } from 'rxjs';
import { EpisodeTimeFormatPipe } from "./shared/episodetimeformat.pipe";
import { FormsModule } from '@angular/forms';
import { EpisodeState } from './core/models/episode_state.interface';

import { NoUiSliderComponent } from './nouislider.component';


const MatModules = [
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
  imports: [MatModules, EpisodeTimeFormatPipe, NoUiSliderComponent],
  providers: [EpisodeTimeFormatPipe],
})
export class StickyPlayerComponent implements OnDestroy {
  public state: EpisodeState;

  private streamObserver: Subscription;

  @ViewChild("progress_slider", { read: NoUiSliderComponent})
  private progressSlider!: NoUiSliderComponent;

  public progress = signal<number>(0);
  public volume = signal<number>(0);

  constructor(
    private streamEpisodeService: StreamEpisodeService,
  ) {

    this.state = this.streamEpisodeService.defaultState();

    this.streamObserver = streamEpisodeService.getState().subscribe(
      (value) => {
        this.state = value;

        let sliderTimerInSeconds = Math.floor(this.progressSlider.get());
        let currentTimeInSeconds = Math.floor(this.state.currentTime);

        if (sliderTimerInSeconds != currentTimeInSeconds) {
          this.progressSlider.set(currentTimeInSeconds, false, true);
        }
      }
    );

    /**
     * Registering signals for updates
     * Everytime the slider change value it will notify effect()
     *
     **/
    // volume slider
    effect(() => {
      this.setVolume(this.volume());
    })

    // stream progress slider
    effect(() => {
      this.seekTo(this.progress());
    })

  }

  public ngOnDestroy(): void {
    this.streamObserver.unsubscribe();
  }

  public startStream () {}

  public play() {
    this.streamEpisodeService.play();
  }

  public pause() {
    this.streamEpisodeService.pause();
  }

  public seek(seconds: number) {
    this.streamEpisodeService.seekTo(this.state.currentTime + seconds);
  }

  public seekTo(value: number | string) {
    const destinationTimeInSeconds = Number(value);
    this.streamEpisodeService.seekTo(destinationTimeInSeconds);
  }

  public toggleMute() {
    this.streamEpisodeService.toggleMute();
  }

  private setVolume(vol: number) {
    this.streamEpisodeService.setVolume(vol);
  }
}
