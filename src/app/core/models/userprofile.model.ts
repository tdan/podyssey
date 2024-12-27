import { Podcast } from "./podcast.model";
import { v4 as uuid } from "uuid";

export class UserProfile {
  public readonly _id: string = uuid();
  public name: string;
  public email: string;
  public authToken: string = "example token needs to change";
  public readonly dateCreatedOn: string = Date.now().toString();
  public favoritePodcasts: Podcast[] = [];

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  public addFavoritePodcast(podcast: Podcast) {
    this.favoritePodcasts.push(podcast);
  }

  public removeFavoritePodcast(podcastID: number) {
    this.favoritePodcasts = this.favoritePodcasts.filter(ele => ele.id == podcastID);
  }

  public getFavoritePodcast(): Podcast[] {
    return this.favoritePodcasts;
  }
}
