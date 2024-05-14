import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, switchMap, take } from 'rxjs';
import { AuthType } from '../type/auth.type';
import { ChiamataApiService } from './chiamata-api.service';
import { ObsTokenJwt } from './obs-token.service';
import { RispostaServer } from '../interface/risposta-server';
import { HttpHeaders } from '@angular/common/http';
import { Utente } from '../interface/utente/utente.interface';
import { Indirizzo } from '../interface/utente/indirizzo.interface';

@Injectable({
	providedIn: 'root',
})
export class ApiUtenteService {
	private auth$: BehaviorSubject<AuthType>;
	private distruggi$ = new Subject<void>();

	constructor(private api: ChiamataApiService, private ObsJwt: ObsTokenJwt) {
		this.auth$ = this.ObsJwt.leggiObsAutorizza();
	}
	ngOnDestroy(): void {
		this.distruggi$.next();
		this.distruggi$.complete();
	}

	public getUtente(): Observable<Utente> {
		return this.apiUtente().pipe(
			map((x) => {
				return x.data;
			}),
		);
	}

	public getIndirizzo(): Observable<Indirizzo> {
		return this.apiIndirizzo().pipe(
			map((x) => {
				return x.data;
			}),
		);
	}

	protected apiUtente(): Observable<RispostaServer> {
		return this.auth$.pipe(
			take(1),
			map((x: AuthType) => {
				const idUtente = x.idUtente;
				if (idUtente !== null) {
					const risorsa: [string, number] = ['contatti', idUtente];
					const token = x.token;
					let headers: HttpHeaders | null;
					if (token && risorsa[1] !== undefined) {
						headers = new HttpHeaders({
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + token,
						});
						return { headers, risorsa };
					} else {
						headers = null;
						const msgError: RispostaServer = {
							data: null,
							message: 'Errore',
							error: 'token null',
						};
						return of(msgError);
					}
				} else {
					const msgError: RispostaServer = {
						data: null,
						message: 'Errore',
						error: 'token null',
					};
					return of(msgError);
				}
			}),
			switchMap((x: any) => {
				const { headers, risorsa } = x;
				if (headers !== null && risorsa !== null) {
					const ritorno = this.api.richiestaGenericaToken(risorsa, 'GET', headers);

					return ritorno;
				} else {
					const msgError: RispostaServer = {
						data: null,
						message: 'Errore',
						error: 'token null',
					};
					return of(msgError);
				}
			}),
		);
	}

	protected apiIndirizzo(): Observable<RispostaServer> {
		return this.auth$.pipe(
			take(1),
			map((x: AuthType) => {
				const idUtente = x.idUtente;
				if (idUtente !== null) {
					const risorsa: [string, number] = ['indirizzi', idUtente];
					const token = x.token;
					let headers: HttpHeaders | null;
					if (token && risorsa[1] !== undefined) {
						headers = new HttpHeaders({
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + token,
						});
						return { headers, risorsa };
					} else {
						headers = null;
						const msgError: RispostaServer = {
							data: null,
							message: 'Errore',
							error: 'token null',
						};
						return of(msgError);
					}
				} else {
					const msgError: RispostaServer = {
						data: null,
						message: 'Errore',
						error: 'token null',
					};
					return of(msgError);
				}
			}),
			switchMap((x: any) => {
				const { headers, risorsa } = x;
				if (headers !== null && risorsa !== null) {
					const ritorno = this.api.richiestaGenericaToken(risorsa, 'GET', headers);

					return ritorno;
				} else {
					const msgError: RispostaServer = {
						data: null,
						message: 'Errore',
						error: 'token null',
					};
					return of(msgError);
				}
			}),
		);
	}
}
