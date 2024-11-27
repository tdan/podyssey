import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EpisodesListComponent } from './episodeslist.component';
import { StickyPlayerComponent } from './stickyplayer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EpisodesListComponent, StickyPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AntennaPod Web';
}
