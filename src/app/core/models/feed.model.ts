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

  public toJson(): string {
    let json = `{
      "id": ${this.id},"guid": ${this.guid},"title": ${this.title},"description": ${this.description},"url": ${this.url},"imageUrl": ${this.imageUrl};
    }`;

    return json;
  }
}
