import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StickyPlayerComponent } from './stickyplayer.component';
import { HomeComponent } from './home.component';
import { UserRegisterComponent } from './user_register.component';
import { UserLoginComponent } from './user_login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, StickyPlayerComponent, UserRegisterComponent, UserLoginComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AntennaPod Web';
}
