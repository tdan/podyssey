export class Feed {
  id: number;
  title: string;
  language: string;
  image: string;

  constructor(id: number, title: string, language: string, image: string) {
    this.id = id;
    this.title = title;
    this.language = language;
    this.image = image;
  }
}
