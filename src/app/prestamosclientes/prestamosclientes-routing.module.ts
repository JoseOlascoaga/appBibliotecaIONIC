import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestamosclientesPage } from './prestamosclientes.page';

const routes: Routes = [
  {
    path: '',
    component: PrestamosclientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestamosclientesPageRoutingModule {}
