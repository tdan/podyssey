import { Component, OnInit } from "@angular/core";
import { LocalUserController } from "./core/controllers/localuser.controller";
import { UserProfile } from "./core/models/userprofile.model";
import { NgOptimizedImage } from "@angular/common";
import { EpisodeState } from "./core/models/episode_state.interface";
import { EpisodeStateListComponent } from "./episodestatelist.component";

@Component({
    selector: "user-history",
    templateUrl: "./user_history.component.html",
    styleUrl: "./user_history.component.css",
    imports: [NgOptimizedImage, EpisodeStateListComponent]
})
export class UserHistoryComponent implements OnInit {
  playbackHistory: EpisodeState[] = []

  constructor(private localUserController: LocalUserController) {}

  public async ngOnInit() {
    let user:UserProfile | undefined = await this.localUserController.getLocalUser();

    if (user != undefined)
      this.playbackHistory = user!.playbackHistory.reverse();
  }
}
