import { Routes } from '@angular/router';
import { SinglePodcastDetailComponent } from './singlepodcastdetail.component';
import { HomeComponent } from './home.component';
import { UserRegisterComponent } from './user_register.component';
import { UserLoginComponent } from './user_login.component';

export const routes: Routes = [
  { path: "podcast/:id", component: SinglePodcastDetailComponent },
  { path: "register", component: UserRegisterComponent },
  { path: "login", component: UserLoginComponent },
  { path: "", component: HomeComponent, },
  { path: "**", redirectTo: "/", },
];
