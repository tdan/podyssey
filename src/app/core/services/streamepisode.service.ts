import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import * as moment from "moment";
import { Episode } from "../models/episode.model";
import { StreamState } from "../models/stream-state.interface";

@Injectable({
  providedIn: 'root'
})
export class StreamEpisodeService {

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart",
  ];

  private audioObj = new Audio();

  private state: StreamState = {
    playing: false,
    currentTime: 0,
    readableCurrentTime: "",
    duration: 0,
    readableDuration: "",
    isPlayable: false,
  }

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);
  private streamStop: Subject<boolean> = new Subject();

  constructor() { }

  public startStream(ep: Episode): Observable<any> {
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

  public getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  private streamObservable(url: string): Observable<any> {
    return new Observable(subscriber => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      // event handler to handle Audio() events
      const eventHandler = (event: Event) => {
        this.updateStateEvents(event);
        subscriber.next(event);
      }

      this.addAudioEvents(this.audioObj, this.audioEvents, eventHandler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeAudioEvents(this.audioObj, this.audioEvents, eventHandler);
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
        this.state.readableCurrentTime
        break;
      case "error":
        this.resetState();
        break;
    }

    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      currentTime: 0,
      readableCurrentTime: "",
      duration: 0,
      readableDuration: "",
      isPlayable: false,
    };
  }
}
