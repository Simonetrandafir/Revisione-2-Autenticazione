import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Generi } from 'src/app/interface/generi.interface';
import { RispostaServer } from 'src/app/interface/risposta-server';
import { ApiGeneriService } from 'src/app/service/api-generi.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
	selector: 'app-btn-generi',
	templateUrl: './btn-generi.component.html',
	styleUrls: ['./btn-generi.component.scss'],
})
export class BtnGeneriComponent implements OnDestroy {
	dataGeneri: Generi[] = [];
	distruggi$: Subject<void> = new Subject<void>();

	constructor(private apiGeneri: ApiGeneriService) {
		this.apiGeneri
			.getGeneri()
			.pipe(takeUntil(this.distruggi$))
			.subscribe((data: Generi[]) => {
				this.dataGeneri = data;
			});
	}
	ngOnDestroy(): void {
		this.distruggi$.next();
	}
}
