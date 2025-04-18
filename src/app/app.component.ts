import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { StickyPlayerComponent } from './stickyplayer.component';
import { SidebarComponent } from './sidebar.component';
import { SearchBoxComponent } from './searchbox.component';

import { IStaticMethods } from 'flyonui/flyonui';
import { LocalUserController } from './core/controllers/localuser.controller';
import { HomepageComponent } from './homepage.component';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StickyPlayerComponent, SidebarComponent, SearchBoxComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Podyssey';

  constructor(
    private router: Router,
    private userController: LocalUserController
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });

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
