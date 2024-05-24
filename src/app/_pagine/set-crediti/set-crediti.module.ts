import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetCreditiRoutingModule } from './set-crediti-routing.module';
import { SetCreditiComponent } from './set-crediti.component';


@NgModule({
  declarations: [
    SetCreditiComponent
  ],
  imports: [
    CommonModule,
    SetCreditiRoutingModule
  ]
})
export class SetCreditiModule { }
