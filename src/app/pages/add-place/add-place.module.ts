import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlacePageRoutingModule } from './add-place-routing.module';

import { AddPlacePage } from './add-place.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlacePageRoutingModule
  ],
  declarations: [AddPlacePage]
})
export class AddPlacePageModule {}
