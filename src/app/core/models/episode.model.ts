import { Feed } from './feed.model';

export interface Episode extends Feed{
  datePublished: string;
  duration: number;
}
