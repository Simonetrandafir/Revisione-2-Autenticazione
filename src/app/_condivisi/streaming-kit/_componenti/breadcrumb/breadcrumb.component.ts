import { Component, Input, Output } from '@angular/core';
import { Generi } from 'src/app/interface/generi.interface';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
	@Input() pagina: string | null = null;
	@Input() genere: Generi | null = null;
	@Output('genereId') genereId: string = '';
}
