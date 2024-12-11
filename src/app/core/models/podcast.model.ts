import { Feed } from './feed.model';

export class Podcast extends Feed {
  author: string;
  website: string;

  constructor(
    id: number,
    guid: string,
    title: string,
    author: string,
    desc: string,
    url: string,
    homeLink: string,
    image: string
  ) {
    super(id, guid, title, desc, url, image);
    this.author = author;
    this.website = homeLink;
  }
}
