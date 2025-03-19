import { EpisodeState } from "./episode_state.interface";
import { Podcast } from "./podcast.model";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  authToken: string;
  dateCreatedOn: string;
  favoritePodcasts: Podcast[];
  playbackHistory: EpisodeState[];
}

export interface UserData extends UserProfile {
  _rev: string;
}
