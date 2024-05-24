import { Component } from '@angular/core';

@Component({
	selector: 'app-info-elemento',
	templateUrl: './info-elemento.component.html',
	styleUrls: ['./info-elemento.component.scss'],
})
export class InfoElementoComponent {
	btnText: string = 'leggi pi\u00F9';

	cambiaBtnTxt() {
		if (this.btnText === 'leggi pi\u00F9') {
			this.btnText = 'leggi meno';
		} else {
			this.btnText = 'leggi pi\u00F9';
		}
	}
}
