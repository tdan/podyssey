import { Episode } from "./episode.model";

export interface EpisodeState {
  episodeInfo: Episode | undefined;
  playing: boolean;
  currentTime: number;
  readableCurrentTime: string;
  readableDuration: string;
  isPlayable: boolean;
  muted: boolean;
  volume: number;
}
