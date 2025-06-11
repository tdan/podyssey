import { Component } from "@angular/core";
import { Podcast } from "./core/models/podcast.model";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { SubscribePodcastButtonComponent } from "./subscribe_podcast_button.component";
import { UserProfile } from "./core/models/userprofile.model";
import { LocalUserController } from "./core/controllers/localuser.controller";
import { PlayEpisodeButtonComponent } from "./play_episode_button.component";
import { Episode } from "./core/models/episode.model";

@Component({
    selector: "home-page",
    templateUrl: "./homepage.component.html",
    styleUrl: "./homepage.component.css",
    imports: [RouterLink, SubscribePodcastButtonComponent, PlayEpisodeButtonComponent]
})
export class HomepageComponent {
  public trending: Podcast[];
  public localUser: UserProfile | undefined;
  public latestEpisodes: Episode[];

  constructor(private route: ActivatedRoute, private localUserController: LocalUserController) {
    this.trending = [];

    this.localUserController.getLocalUser()
      .then( (user) => {
        this.localUser = user;
      }
    );

    this.latestEpisodes = [];
  }

  public ngOnInit() {
    this.trending = this.route.snapshot.data["trending"];
    this.latestEpisodes = this.localUserController.getLatestEpisodes();
  }
}
