import { Episode } from "./episode.model";

export interface EpisodeState {
  episodeInfo: Episode | undefined;
  playing: boolean;
  currentTime: number;
  readableCurrentTime: string;
  readableDuration: string;
  isPlayable: boolean;
  loading: boolean;
  muted: boolean;
  volume: number;
}
