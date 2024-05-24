import { Component, Input } from '@angular/core';

import { Film, SerieTv } from 'src/app/interface/utente/streaming.interface';

@Component({
	selector: 'app-contenitore',
	templateUrl: './contenitore.component.html',
	styleUrls: ['./contenitore.component.scss'],
})
export class ContenitoreComponent {
	@Input() dataElementi: any[] = [];
	@Input() link!: string;
	constructor() {}
}
