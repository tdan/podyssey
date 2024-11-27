import { Feed } from './feed.model';

export class Episode {
  id: number;
  title: string;
  datePublished: string;
  duration: number;
  desc: string;
  url: string;
  parentFeed: Feed;

  constructor(id: number, title: string, datePublished: string, duration:number, desc: string, url: string) {
    this.id = id;
    this.title = title;
    this.datePublished = datePublished;
    this.duration = duration;
    this.desc = desc;
    this.url = url;
    this.parentFeed = new Feed(0,'','','');
  }

  public addParentFeed(feedId: number, feedTitle: string, feedLang: string, feedImg: string) {
    this.parentFeed = new Feed(feedId, feedTitle, feedLang, feedImg);
  }
}
