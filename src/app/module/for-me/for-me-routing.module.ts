import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForMePage } from './for-me.page';

const routes: Routes = [
  {
    path: '',
    component: ForMePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForMePageRoutingModule {}
