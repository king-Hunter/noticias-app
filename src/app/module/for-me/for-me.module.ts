import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForMePageRoutingModule } from './for-me-routing.module';

import { ForMePage } from './for-me.page';
import { ComponentsModule } from '../../core/module/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForMePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ForMePage]
})
export class ForMePageModule {}
