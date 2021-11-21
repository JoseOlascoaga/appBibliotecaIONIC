import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestamosclientesPageRoutingModule } from './prestamosclientes-routing.module';

import { PrestamosclientesPage } from './prestamosclientes.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PrestamosclientesPageRoutingModule,
    HttpClientModule
  ],
  declarations: [PrestamosclientesPage]
})
export class PrestamosclientesPageModule {}
