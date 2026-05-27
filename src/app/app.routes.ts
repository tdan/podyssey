import { Routes } from '@angular/router';
import { SinglePodcastDetailComponent } from "./features/podcasts/components/singlepodcastdetail.component";
import { UserSubscriptionsComponent } from "./features/user/components/user_subscriptions.component";
import { UserHistoryComponent } from "./features/user/components/user_history.component";
import { HomepageComponent } from './homepage.component';
import { TrendingPodcastsResolver } from './core/resolvers/trending.resolver';
import { DisplaySearchResultComponent } from "./features/searchbox/display_search_result.component";
import { DisplayCategoryComponent } from "./features/podcasts/components/display_category.component";

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
