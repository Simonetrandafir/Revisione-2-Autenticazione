import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';
import { RispostaServer } from 'src/app/interface/risposta-server';
import { Indirizzo } from 'src/app/interface/utente/indirizzo.interface';
import { Utente } from 'src/app/interface/utente/utente.interface';
import { ApiUtenteService } from 'src/app/service/api-utente.service';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-profilo',
	templateUrl: './profilo.component.html',
	styleUrls: ['./profilo.component.scss'],
})
export class ProfiloComponent implements AfterViewInit, OnDestroy {
	auth$: BehaviorSubject<AuthType>;

	constructor(private ObsTokenJwt: ObsTokenJwt, private router: Router, private apiUtente: ApiUtenteService) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
		//--------------------------------------- TEST
		this.obsUtente$ = this.apiUtente.getUtente();
		this.obsIndirizzo$ = this.apiUtente.getIndirizzo();
	}
	ngAfterViewInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				this.router.navigate(['/index']);
				window.location.reload();
			}
		});
	}

	//------------------------- SET VISTA PROFILO ------------------------
	obsUtente$: Observable<Utente>;
	obsIndirizzo$: Observable<Indirizzo>;

	private distruggi$ = new Subject<void>();

	ngOnDestroy(): void {
		this.distruggi$.next();
		this.distruggi$.complete();
	}
}
