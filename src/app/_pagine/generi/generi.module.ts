import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneriRoutingModule } from './generi-routing.module';
import { GeneriComponent } from './generi.component';


@NgModule({
  declarations: [
    GeneriComponent
  ],
  imports: [
    CommonModule,
    GeneriRoutingModule
  ]
})
export class GeneriModule { }
