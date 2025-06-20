import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StickyPlayerComponent } from './stickyplayer.component';
import { SidebarComponent } from './sidebar.component';
import { SearchBoxComponent } from './searchbox.component';
import { LocalUserController } from './core/controllers/localuser.controller';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StickyPlayerComponent, SidebarComponent, SearchBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
        if (user === undefined || user._id == "")
          this.userController.createLocalUser();
      })
      .catch((error) => {
        console.log(error as Error);
      })
  }
}
