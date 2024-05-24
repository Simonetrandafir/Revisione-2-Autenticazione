import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoElementoComponent } from './_componenti/info-elemento/info-elemento.component';
import { ImgElementoComponent } from './_componenti/img-elemento/img-elemento.component';
import { NavElementoComponent } from './_componenti/nav-elemento/nav-elemento.component';
import { StagioniComponent } from './_componenti/stagioni/stagioni.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TroncaTestoDirective } from 'src/app/_direttive/tronca-testo.directive';

@NgModule({
	declarations: [InfoElementoComponent, ImgElementoComponent, NavElementoComponent, StagioniComponent, TroncaTestoDirective],
	imports: [CommonModule, NgbNavModule],
	exports: [InfoElementoComponent, ImgElementoComponent, NavElementoComponent, StagioniComponent, TroncaTestoDirective],
})
export class ElementoKitModule {}
