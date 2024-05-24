import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatiUtenteComponent } from './_componenti/dati-utente/dati-utente.component';

@NgModule({
	declarations: [DatiUtenteComponent],
	imports: [CommonModule],
	exports: [DatiUtenteComponent],
})
export class InfoKitModule {}
