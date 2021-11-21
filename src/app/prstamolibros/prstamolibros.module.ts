import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrstamolibrosPageRoutingModule } from './prstamolibros-routing.module';

import { PrstamolibrosPage } from './prstamolibros.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PrstamolibrosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [PrstamolibrosPage]
})
export class PrstamolibrosPageModule {}
