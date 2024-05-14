import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpostazioniRoutingModule } from './impostazioni-routing.module';
import { ImpostazioniComponent } from './impostazioni.component';


@NgModule({
  declarations: [
    ImpostazioniComponent
  ],
  imports: [
    CommonModule,
    ImpostazioniRoutingModule
  ]
})
export class ImpostazioniModule { }
