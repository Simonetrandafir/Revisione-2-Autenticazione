import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, concat, config, exhaustMap, interval, map, switchMap, take, takeUntil, tap } from 'rxjs';
import { AuthType } from './type/auth.type';
import { ObsTokenJwt } from './service/obs-token.service';
import { Router } from '@angular/router';

import { Config } from './interface/config.interface';
import { RispostaServer } from './interface/risposta-server';
import { ApiPublicService } from './service/api-public.service';
import { MsgUtenteService } from './service/msg-utente.service';
import { MsgUtenteT } from './type/msgUtente.type';
import { UtilityService } from './service/utility.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
	title = 'codex';
	private distruggi$ = new Subject<void>();

	protected auth$: BehaviorSubject<AuthType>;

	protected autorizza: AuthType;

	msg$: BehaviorSubject<MsgUtenteT>;

	constructor(
		private msgService: MsgUtenteService,
		private ObsTokenJwt: ObsTokenJwt,
		private router: Router,
		private api: ApiPublicService,
		private utility: UtilityService,
	) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
		this.autorizza = this.auth$.getValue();
		this.msg$ = this.msgService.leggiObsMsg();
	}
	ngOnDestroy(): void {
		this.distruggi$.next();
		this.distruggi$.complete();
	}
	ngAfterViewInit(): void {
		//------------ Controllo ---------------------------------------------------------------------
		this.auth$
			.pipe(
				exhaustMap((auth: AuthType) => {
					if (auth.token === null) {
						this.router.navigate(['/index']);
					}
					return this.api.getSessioneConfig().pipe(
						tap((data: Config) => {
							if (auth.avvioSessione !== null) {
								const avvioSessione: number = auth.avvioSessione;
								const durataSessione: number = parseInt(data.valore);
								const maxSessione: number = avvioSessione + durataSessione;
								if (Date.now() >= maxSessione) {
									UtilityService.logOut();
									window.location.reload();
								}
							}
						}),
						exhaustMap((data: Config) => {
							return interval(10000).pipe(
								map(() => {
									this.autorizza = this.auth$.getValue();
									this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
									if (this.autorizza.avvioSessione !== null) {
										const avvioSessione: number = this.autorizza.avvioSessione;
										const durataSessione: number = parseInt(data.valore);
										const maxSessione: number = avvioSessione + durataSessione;
										if (Date.now() >= maxSessione) {
											UtilityService.logOut();
											window.location.reload();
										}
									}
								}),
							);
						}),
					);
				}),
				takeUntil(this.distruggi$),
			)
			.subscribe();
	}
}
