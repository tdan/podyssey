import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StickyPlayerComponent } from './stickyplayer.component';
import { SidebarComponent } from './sidebar.component';
import { SearchBoxComponent } from './searchbox.component';
import { LocalUserController } from './core/controllers/localuser.controller';
import { PodchaserService } from './core/services/podchaser.service';
import { PodcastAPIService } from './core/services/podcast_api.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StickyPlayerComponent, SidebarComponent, SearchBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: PodcastAPIService, useClass: PodchaserService },
  ]
})
export class AppComponent {
  title = 'Podyssey';

  constructor(
    private userController: LocalUserController
  ) {}

  ngOnInit() {
    // initialize user
    this.userController.getLocalUser()
      .then((user) => {
        console.log("[AppComponent]", user);
        if (user === undefined || user._id == "")
          this.userController.createLocalUser();
      })
      .catch((error) => {
        console.log(error as Error);
      })
  }
}
