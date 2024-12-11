export class Feed {
  id: number;
  guid: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;

  constructor(id: number, guid:string, title: string, desc: string, url: string, image: string) {
    this.id = id;
    this.guid = guid;
    this.title = title;
    this.description = desc;
    this.url = url
    this.imageUrl = image;
  }
}
