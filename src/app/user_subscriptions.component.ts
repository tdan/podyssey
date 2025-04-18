import { Component, OnInit } from "@angular/core";
import { LocalUserController } from "./core/controllers/localuser.controller";
import { UserProfile } from "./core/models/userprofile.model";
import { Podcast } from "./core/models/podcast.model";
import { NgOptimizedImage } from "@angular/common";
import { PodcastsListComponent } from "./podcastslist.component";

@Component({
  selector: "user-subcriptions",
  standalone: true,
  templateUrl: "./user_subscriptions.component.html",
  styleUrl: "./user_subscriptions.component.css",
  imports: [NgOptimizedImage, PodcastsListComponent],
})
export class UserSubscriptionsComponent implements OnInit {
  subscriptionList: Podcast[] = [];

  constructor(private localUserController: LocalUserController) {}

  public async ngOnInit() {
    let user:UserProfile | undefined = await this.localUserController.getLocalUser();

    if (user != undefined)
      this.subscriptionList = user!.favoritePodcasts;
  }
}
