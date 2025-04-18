import { Injectable } from "@angular/core";
import { PouchDBService } from "../services/pouchdb.service";
import { UserProfile, UserData } from "../models/userprofile.model";
import { Podcast } from "../models/podcast.model";
import { v4 as uuid } from "uuid";
import { StreamEpisodeService } from "../services/streamepisode.service";
import { Subscription, bufferTime, map } from "rxjs";
import { EpisodeState } from "../models/episode_state.interface";

@Injectable({
  providedIn: "root"
})
export class LocalUserController {
  private currentUser: UserProfile | undefined;
  private streamObserver: Subscription | undefined;
  private _rev: string = "";


  constructor(
    private localDBService: PouchDBService,
    private streamService: StreamEpisodeService,
  ) {
    // Get a snapshot of episode streaming state every 30 seconds
    this.streamObserver = this.streamService.getState()
      .pipe(
        bufferTime(30000),
      )
      .subscribe(buffer => {
        let episode = buffer.slice(-1)[0];

        // TODO: remove an episode if it is finished playing
        if (episode != undefined && episode.playing == true)
          this.updatePlaybackHistory(episode!);
      });

    this.currentUser = {
      name: "",
      email: "",
      _id: "",
      authToken: "",
      dateCreatedOn: "",
      favoritePodcasts: [],
      playbackHistory: []
    } as UserProfile
  }

  public async createLocalUser(): Promise<UserProfile | undefined> {
    let defaultName: string = Math.random().toString(36).substring(2,7);

    let newUser: UserProfile = {
        name: defaultName,
        email: defaultName + "@default.email",
        _id: uuid(),
        authToken: this.authTokenGenerator(),
        dateCreatedOn: "",
        favoritePodcasts: [],
        playbackHistory: []
    };

    this._rev = await this.localDBService.update(newUser);
    this.currentUser = newUser;
    console.log("[Create] ", this.currentUser);

    return newUser;
  }


  public async getLocalUser(): Promise<UserProfile | undefined> {
    // TODO: consider caching user to we don't have to get All documents everytime
    try {
      let allDocs = await this.localDBService.getAll();

      console.log("[All Doc]", allDocs);
      console.log("[All Doc]", allDocs.total_rows);

      if(allDocs.total_rows > 0) {
        this.currentUser!.name = allDocs.rows[0].doc.name;
        this.currentUser!.email = allDocs.rows[0].doc.email;
        this.currentUser!.authToken = allDocs.rows[0].doc.authToken;
        this.currentUser!._id = allDocs.rows[0].doc._id;
        this.currentUser!.dateCreatedOn = allDocs.rows[0].doc.dateCreatedOn;
        this.currentUser!.favoritePodcasts = allDocs.rows[0].doc.favoritePodcasts;
        this.currentUser!.playbackHistory = allDocs.rows[0].doc.playbackHistory;

        this._rev = allDocs.rows[0].doc._rev;

        console.log("[Current User]", this.currentUser);

        return this.currentUser;
      }
    } catch(error) {
      console.log(error);
    }

    return undefined;
  }


  public async subscribeToPodcast(podcast: Podcast) {
    // TODO: need to implement a way to check if latest version of
    // currentUser is loaded before getting a new one

    await this.getLocalUser();

    if (this.currentUser == undefined)
      return;

    if (this.currentUser.favoritePodcasts
          .find((obj) => obj.id === podcast.id) != undefined)
    {
      console.log("Already has in favorite")
      return;
    }

    this.currentUser.favoritePodcasts.push(podcast);

    this.save();
  }


  public async updatePlaybackHistory(episode: EpisodeState) {
    await this.getLocalUser();

    let foundIdx: number =
      this.currentUser!.playbackHistory
        .findIndex(item =>
            item.episodeInfo!.id == episode.episodeInfo!.id
        );

    console.log("[playbackHistory] ", foundIdx);

    if (foundIdx < 0)
      this.currentUser!.playbackHistory.push(episode);
    else {
      this.currentUser!.playbackHistory[foundIdx].currentTime = episode.currentTime;
    }

    this.save();
  }


  /**
   * Save current user data to database
   */
  public async save() {
    let userData: UserData = { ...this.currentUser!, _rev: this._rev };

    console.log("[Save] UserData:", userData);

    this._rev = await this.localDBService.update(userData);

    console.log("[Save] Rev", this._rev)
  }


  private authTokenGenerator(): string {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 8;
    var password = "";

    for (var i = 0; i < passwordLength; i++) {
      var rand = Math.floor(Math.random() * chars.length);
      password += chars.substring(rand, rand + 1);
    }

    return password;
  }

}
