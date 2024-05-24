import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-img-elemento',
	templateUrl: './img-elemento.component.html',
	styleUrls: ['./img-elemento.component.scss'],
})
export class ImgElementoComponent {
	coverImgUrl: string;
	logoImgUrl: string;
	constructor() {
		this.logoImgUrl = 'https://placehold.co/300x100/red/white';
		this.coverImgUrl = 'https://placehold.co/300x100/gray/white';
	}
	@Input() idCategoria!: string;
}
