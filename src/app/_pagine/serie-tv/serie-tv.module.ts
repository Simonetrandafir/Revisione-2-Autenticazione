import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerieTvRoutingModule } from './serie-tv-routing.module';
import { SerieTvComponent } from './serie-tv.component';


@NgModule({
  declarations: [
    SerieTvComponent
  ],
  imports: [
    CommonModule,
    SerieTvRoutingModule
  ]
})
export class SerieTvModule { }
