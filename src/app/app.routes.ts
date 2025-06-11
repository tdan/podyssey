import { Routes } from '@angular/router';
import { SinglePodcastDetailComponent } from './singlepodcastdetail.component';
import { UserSubscriptionsComponent } from './user_subscriptions.component';
import { UserHistoryComponent } from './user_history.component';
import { HomepageComponent } from './homepage.component';
import { TrendingPodcastsResolver } from './core/resolvers/trending.resolver';
import { DisplaySearchResultComponent } from './display_search_result.component';
import { DisplayCategoryComponent } from './display_category.component';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => HomepageComponent,
    resolve: {
      trending: TrendingPodcastsResolver,
    }
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
    loadComponent: () => DisplaySearchResultComponent
  },
  {
    path: "category/:slug",
    loadComponent: () => DisplayCategoryComponent
  }
];
