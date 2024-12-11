import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StickyPlayerComponent } from './stickyplayer.component';
import { HomeComponent } from './home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, StickyPlayerComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AntennaPod Web';
}
