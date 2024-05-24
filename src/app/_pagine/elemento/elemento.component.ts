import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-elemento',
	templateUrl: './elemento.component.html',
	styleUrls: ['./elemento.component.scss'],
})
export class ElementoComponent {
	constructor(private route: ActivatedRoute) {}
	idCategoria!: string;

	ngOnInit(): void {
		// Ottieni l'ID dall'URL
		this.route.params.subscribe((params) => {
			this.idCategoria = params['idCategoria'];
		});
	}
}
