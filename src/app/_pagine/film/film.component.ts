import { AfterViewInit, Component } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Generi } from 'src/app/interface/generi.interface';
import { Film } from 'src/app/interface/utente/streaming.interface';
import { ApiGeneriService } from 'src/app/service/api-generi.service';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-film',
	templateUrl: './film.component.html',
	styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements AfterViewInit {
	auth$: BehaviorSubject<AuthType>;

	dataFilm: Film[] = [];
	dataFilmGeneri: Film[] = [];

	dataGeneri: Generi[] = [];
	distruggi$: Subject<void> = new Subject<void>();

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
	ngOnDestroy(): void {
		this.distruggi$.next();
	}
}
