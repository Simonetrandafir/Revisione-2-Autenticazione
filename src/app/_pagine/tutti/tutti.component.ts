import { Component } from '@angular/core';

@Component({
	selector: 'app-tutti',
	templateUrl: './tutti.component.html',
	styleUrls: ['./tutti.component.scss'],
})
export class TuttiComponent {
	elementi: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	titolo: string = 'Tutti';
}
