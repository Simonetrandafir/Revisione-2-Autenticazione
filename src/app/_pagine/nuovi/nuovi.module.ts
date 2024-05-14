import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuoviRoutingModule } from './nuovi-routing.module';
import { NuoviComponent } from './nuovi.component';


@NgModule({
  declarations: [
    NuoviComponent
  ],
  imports: [
    CommonModule,
    NuoviRoutingModule
  ]
})
export class NuoviModule { }
