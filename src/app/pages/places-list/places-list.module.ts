import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesListPageRoutingModule } from './places-list-routing.module';

import { PlacesListPage } from './places-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesListPageRoutingModule
  ],
  declarations: [PlacesListPage]
})
export class PlacesListPageModule {}
