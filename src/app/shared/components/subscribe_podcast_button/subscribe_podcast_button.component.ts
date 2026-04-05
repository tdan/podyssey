import { Component, input } from "@angular/core"
import { LocalUserController } from "./core/controllers/localuser.controller";
import { Podcast } from "./core/models/podcast.model";

@Component({
  selector: "subscribe-podcast-button",
  standalone: true,
  templateUrl: "./subscribe_podcast_button.component.html",
  styleUrl: "./subscribe_podcast_button.component.css",
})
export class SubscribePodcastButtonComponent {
  public podcast = input.required<Podcast>();

  constructor(private userController: LocalUserController) {}

  public subscribe() {
    this.userController.subscribeToPodcast(this.podcast());
  }
}
