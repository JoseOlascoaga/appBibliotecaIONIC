import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrstamolibrosPage } from './prstamolibros.page';

const routes: Routes = [
  {
    path: '',
    component: PrstamolibrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrstamolibrosPageRoutingModule {}
