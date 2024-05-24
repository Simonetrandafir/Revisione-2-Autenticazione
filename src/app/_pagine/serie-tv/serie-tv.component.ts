import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Generi } from 'src/app/interface/generi.interface';
import { SerieTv } from 'src/app/interface/utente/streaming.interface';
import { ApiGeneriService } from 'src/app/service/api-generi.service';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-serie-tv',
	templateUrl: './serie-tv.component.html',
	styleUrls: ['./serie-tv.component.scss'],
})
export class SerieTvComponent implements AfterViewInit, OnDestroy {
	auth$: BehaviorSubject<AuthType>;
	dataSerie: SerieTv[] = [];
	dataSerieGenere: SerieTv[] = [];

	constructor(private ObsTokenJwt: ObsTokenJwt, private apiGeneri: ApiGeneriService) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
		this.apiGeneri
			.getGeneri()
			.pipe(takeUntil(this.distruggi$))
			.subscribe((data: Generi[]) => {
				this.dataGeneri = data;
			});
	}
	ngAfterViewInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				window.location.reload();
			}
		});
	}
	dataGeneri: Generi[] = [];
	distruggi$: Subject<void> = new Subject<void>();
	ngOnDestroy(): void {
		this.distruggi$.next();
	}
}
