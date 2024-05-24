import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-nav-elemento',
	templateUrl: './nav-elemento.component.html',
	styleUrls: ['./nav-elemento.component.scss'],
})
export class NavElementoComponent {
	active: number;
	@Input() idCategoria!: string;
	constructor() {
		if (this.idCategoria === '2') {
			this.active = 1;
			console.log(this.active);
		} else {
			this.active = 2;
		}
	}
}
