import { Routes } from '@angular/router';
import { SinglePodcastDetailComponent } from './singlepodcastdetail.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: "podcast/:id", component: SinglePodcastDetailComponent },
  { path: "", component: HomeComponent, },
  { path: "**", redirectTo: "/", },
];
