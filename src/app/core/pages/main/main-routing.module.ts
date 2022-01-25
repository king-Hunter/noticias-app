import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/for-me',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'news',
        loadChildren: () =>
          import('./../../../module/news/news.module').then(
            (m) => m.NewsPageModule
          ),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./../../../module/favorites/favorites.module').then(
            (m) => m.FavoritesPageModule
          ),
      },
      {
        path: 'for-me',
        loadChildren: () =>
          import('./../../../module/for-me/for-me.module').then(
            (m) => m.ForMePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
