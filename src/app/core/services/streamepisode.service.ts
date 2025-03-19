import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import * as moment from "moment";
import { Episode } from "../models/episode.model";
import { EpisodeState } from "../models/episode_state.interface";


// List of default HTML Audio Events.
// Please refer to: https://www.w3schools.com/tags/ref_av_dom.asp
const audioEvents = [
  "ended",
  "error",
  "play",
  "playing",
  "pause",
  "timeupdate",
  "canplay",
  "loadedmetadata",
  "loadstart",
  "ratechange",
  "volumechange",
];


@Injectable({
  providedIn: 'root'
})
export class StreamEpisodeService {
  private audioObj;
  private state;
  private stateChange: BehaviorSubject<EpisodeState>;
  private streamStop: Subject<boolean>;


  constructor() {
    this.audioObj = new Audio();
    this.state = this.defaultState();
    this.stateChange = new BehaviorSubject(this.state);
    this.streamStop = new Subject();
  }

  public startStream(ep: Episode): Observable<any> {
    this.state.episodeInfo = ep;
    return this.streamObservable(ep.url).pipe(takeUntil(this.streamStop));
  }

  public play() {
    try {
      this.audioObj.play();
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  public pause() {
    try {
      this.audioObj.pause();
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  public seekTo(destinationTimeInSeconds: number) {
    this.audioObj.currentTime = destinationTimeInSeconds;
  }

  public stop() {
    this.streamStop.next(true);
  }

  public toggleMute() {
    //TODO: find a way to integrate this muted state change
    // into streamObservable and AudioEventsHandler

    // Mute Audio Object
    this.audioObj.muted = !this.audioObj.muted;
    // Update the state
    this.state.muted = !this.state.muted;
    this.stateChange.next(this.state);

  }

  public getState(): Observable<EpisodeState> {
    return this.stateChange.asObservable();
  }

  public defaultState(): EpisodeState {

    return {
      episodeInfo: undefined,
      playing: false,
      currentTime: 0,
      readableCurrentTime: "",
      duration: 0,
      readableDuration: "",
      isPlayable: false,
      muted: false,
      volume: 1.0,
    } as EpisodeState;

  }

  public setVolume(vol: number) {
    this.audioObj.volume = vol;
  }

  private streamObservable(url: string): Observable<any> {
    return new Observable(subscriber => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.volume = this.state.volume;
      this.audioObj.muted = this.state.muted;

      this.audioObj.play();


      // event handler to handle Audio() events
      const eventHandler = (event: Event) => {
        this.updateStateEvents(event);
        subscriber.next(event);
      }

      this.addAudioEvents(this.audioObj, audioEvents, eventHandler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeAudioEvents(this.audioObj, audioEvents, eventHandler);
      }
    });
  }

  private addAudioEvents(obj: HTMLAudioElement, events, handler) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeAudioEvents(obj: HTMLAudioElement, events, handler) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  private updateStateEvents(event: Event) {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.isPlayable = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        break;
      case "volumechange":
        this.state.volume = this.audioObj.volume;
        break;
      case "error":
        this.resetState();
        break;
    }

    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = this.defaultState();
  }
}
