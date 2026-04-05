import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'episodeTimeFormat',
  standalone: true,
})
export class EpisodeTimeFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    // cast to number type first in case value is a string
    const totalSeconds = Number(value);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor( (totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    let result = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (!!hours) {
      result = `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return result;
  }

}
