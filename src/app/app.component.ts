import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, interval, map, switchMap, take, takeUntil } from 'rxjs';
import { AuthType } from './type/auth.type';
import { ObsTokenJwt } from './service/obs-token.service';
import { Router } from '@angular/router';

import { Config } from './interface/config.interface';
import { RispostaServer } from './interface/risposta-server';
import { ApiPublicService } from './service/api-public.service';
import { MsgUtenteService } from './service/msg-utente.service';
import { MsgUtenteT } from './type/msgUtente.type';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
	title = 'codex';
	protected auth$: BehaviorSubject<AuthType>;
	protected config$: Observable<RispostaServer>;
	protected autorizzazione: AuthType;
	msg$: BehaviorSubject<MsgUtenteT>;
	private distruggi$ = new Subject<void>();

	constructor(private msgService: MsgUtenteService, private ObsTokenJwt: ObsTokenJwt, private router: Router, private api: ApiPublicService) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
		this.autorizzazione = this.auth$.getValue();
		this.config$ = this.api.getHttpConfigId('3');
		this.msg$ = this.msgService.leggiObsMsg();
	}
	ngOnDestroy(): void {
		this.distruggi$.next();
		this.distruggi$.complete();
	}
	ngAfterViewInit(): void {
		//------------ Controllo TOKEN ---------------------------------------------------------------------
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				this.router.navigate(['/index']);
			}
		});
	}
}
