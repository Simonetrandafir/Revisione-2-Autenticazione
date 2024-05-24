import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditoComponent } from './_componenti/credito/credito.component';
import { SicurezzaComponent } from './_componenti/sicurezza/sicurezza.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [CreditoComponent, SicurezzaComponent],
	exports: [CreditoComponent, SicurezzaComponent, RouterModule],
	imports: [CommonModule, RouterModule],
})
export class ProfiloKitModule {}
