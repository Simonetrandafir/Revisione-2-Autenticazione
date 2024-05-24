import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-breadcrumb-home',
	templateUrl: './breadcrumb-home.component.html',
	styleUrls: ['./breadcrumb-home.component.scss'],
})
export class BreadcrumbHomeComponent {
	@Input() pagina: string | null = null;
	@Input() breadcrumb: string | null = null;
}
