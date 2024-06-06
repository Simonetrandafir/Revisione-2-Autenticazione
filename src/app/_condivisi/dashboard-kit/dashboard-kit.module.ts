import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUtentiComponent } from './_componenti/view-utenti/view-utenti.component';
import { NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewIndirizziComponent } from './_componenti/view-indirizzi/view-indirizzi.component';
import { ViewRecapitiComponent } from './_componenti/view-recapiti/view-recapiti.component';

@NgModule({
	declarations: [ViewUtentiComponent, ViewIndirizziComponent, ViewRecapitiComponent],
	imports: [CommonModule, NgbPaginationModule, NgbTypeaheadModule, FormsModule, ReactiveFormsModule, NgbPaginationModule, NgbTooltipModule],
	exports: [ViewUtentiComponent, NgbTooltipModule, ViewIndirizziComponent, ViewRecapitiComponent],
})
export class DashboardKitModule {}
