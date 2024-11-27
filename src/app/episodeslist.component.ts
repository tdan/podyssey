import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { PodcastIndexService } from '../app/core/services/podcastindex.service';
import { Episode } from './core/models/episode.model';
import { StreamEpisodeService } from "./core/services/streamepisode.service";

@Component({
  standalone: true,
  selector: 'episodes-list',
  templateUrl: './episodeslist.component.html',
  styleUrls: ['./episodeslist.component.css']
})
export class EpisodesListComponent implements OnInit {
  // private podcastIdxClient: PodcastIndexClient;
  episodes: any[];

  constructor(
    private podcastAPI: PodcastIndexService,
    private streamEpisodeService: StreamEpisodeService
  ) {
    // this.podcastIdxClient = new PodcastIndexClient({
    //   key:'BX8FXM5ZSEG28M5JLA43',
    //   secret: 'aTVM4Rc8sxVWEUvx69WWnGdBpcmEux$XscH#scuG',
    //   disableAnalytics: false,
    // });
    this.episodes = [];
  }

  public ngOnInit(): void {
    this.podcastAPI.getRecentEpisodes().subscribe((episodesList: Episode[]) => {
      this.episodes = episodesList;
    });
  }

  public selectEpisode(ep: Episode) {
    this.podcastAPI.getEpisodeById(ep.id).subscribe((episode: Episode) => {
      console.log(episode);
      this.streamEpisodeService.startStream(episode).subscribe(events => {});
    });
  }
}
