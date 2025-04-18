import { Routes } from '@angular/router';
import { SinglePodcastDetailComponent } from './singlepodcastdetail.component';
import { UserSubscriptionsComponent } from './user_subscriptions.component';
import { UserHistoryComponent } from './user_history.component';
import { SearchResultDisplayComponent } from './search_result_display.component';
import { HomepageComponent } from './homepage.component';
import { TrendingPodcastsResolver } from './core/resolvers/trending.resolver';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => HomepageComponent,
    resolve: { trending: TrendingPodcastsResolver }
  },
  {
    path: "podcast/:id",
    loadComponent: () => SinglePodcastDetailComponent
  },
  {
    path: "subscriptions",
    loadComponent: () => UserSubscriptionsComponent
  },
  {
    path: "history",
    loadComponent: () => UserHistoryComponent
  },
  {
    path: "search",
    loadComponent: () => SearchResultDisplayComponent
  },
];
