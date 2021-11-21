import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorialesPageRoutingModule } from './editoriales-routing.module';

import { EditorialesPage } from './editoriales.page';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditorialesPageRoutingModule,
    HttpClientModule
  ],
  declarations: [EditorialesPage]
})
export class EditorialesPageModule {}
