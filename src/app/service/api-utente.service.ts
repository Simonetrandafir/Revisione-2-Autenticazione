import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, switchMap, take } from 'rxjs';
import { AuthType } from '../type/auth.type';
import { ChiamataApiService } from './chiamata-api.service';
import { ObsTokenJwt } from './obs-token.service';
import { RispostaServer } from '../interface/risposta-server';
import { HttpHeaders } from '@angular/common/http';
import { Utente } from '../interface/utente/utente.interface';
import { Indirizzo } from '../interface/utente/indirizzo.interface';
import { Recapito } from '../interface/utente/recapito.interface';
import { Credito } from '../interface/utente/credito.interface';
import { Psw } from '../interface/utente/psw.interface';
import { NewPsw } from '../interface/utente/newPsw.interface';

@Injectable({
	providedIn: 'root',
})
export class ApiUtenteService {
	private auth$: BehaviorSubject<AuthType>;

	private utenteSub: Subject<Utente> = new Subject<Utente>();
	private indirizziSub: Subject<Indirizzo[]> = new Subject<Indirizzo[]>();
	private recapitiSub: Subject<Recapito[]> = new Subject<Recapito[]>();
	private creditiSub: Subject<Credito> = new Subject<Credito>();
	private passwordSub: Subject<Psw> = new Subject<Psw>();
	private setPswSub: Subject<NewPsw> = new Subject<NewPsw>();

	constructor(private api: ChiamataApiService, private ObsJwt: ObsTokenJwt) {
		this.auth$ = this.ObsJwt.leggiObsAutorizza();
	}

	public getUtente(): Subject<Utente> {
		this.loadUtente();
		return this.utenteSub;
	}

	public getIndirizzo(): Subject<Indirizzo[]> {
		this.loadIndirizzo();
		return this.indirizziSub;
	}

	public getRecapito(): Subject<Recapito[]> {
		this.loadRecapito();
		return this.recapitiSub;
	}

	public getCredito(): Subject<Credito> {
		this.loadCredito();
		return this.creditiSub;
	}

	public getPsw(): Subject<Psw> {
		this.loadPsw();
		return this.passwordSub;
	}

	public setNewPsw(dataPsw: NewPsw): Subject<NewPsw> {
		this.sendPsw(dataPsw);
		return this.setPswSub;
	}

	//!-------------------------------------- PROTECTED --------------------------------------------
	protected loadUtente(): void {
		this.apiUtente()
			.pipe(
				map((x: RispostaServer) => {
					return x.data;
				}),
			)
			.subscribe((data: Utente) => {
				this.utenteSub.next(data);
			});
	}

	protected loadIndirizzo(): void {
		this.apiIndirizzo()
			.pipe(
				map((x: RispostaServer) => {
					return x.data;
				}),
			)
			.subscribe((data: Indirizzo[]) => {
				this.indirizziSub.next(data);
			});
	}

	protected loadRecapito(): void {
		this.apiRecapito()
			.pipe(
				map((x: RispostaServer) => {
					return x.data;
				}),
			)
			.subscribe((data: Recapito[]) => {
				this.recapitiSub.next(data);
			});
	}

	protected loadCredito(): void {
		this.apiCredito()
			.pipe(
				map((x: RispostaServer) => {
					return x.data;
				}),
			)
			.subscribe((data: Credito) => {
				this.creditiSub.next(data);
			});
	}

	protected loadPsw(): void {
		this.apiPsw()
			.pipe(
				map((x: RispostaServer) => {
					return x.data;
				}),
			)
			.subscribe((data: Psw) => {
				this.passwordSub.next(data);
			});
	}

	protected sendPsw(newPswData: NewPsw): void {
		this.postPsw(newPswData)
			.pipe(
				map((x: RispostaServer) => {
					return x.data;
				}),
			)
			.subscribe((data: Psw) => {
				this.setPswSub.next(data);
			});
	}

	//!----------------------------------- PRIVATE --------------------------------------------------
	private apiUtente(): Observable<RispostaServer> {
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

	private apiIndirizzo(): Observable<RispostaServer> {
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

	private apiRecapito(): Observable<RispostaServer> {
		return this.auth$.pipe(
			take(1),
			map((x: AuthType) => {
				const idUtente = x.idUtente;
				if (idUtente !== null) {
					const risorsa: [string, number] = ['recapiti', idUtente];
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

	private apiCredito(): Observable<RispostaServer> {
		return this.auth$.pipe(
			take(1),
			map((x: AuthType) => {
				const idUtente = x.idUtente;
				if (idUtente !== null) {
					const risorsa: [string, number] = ['crediti', idUtente];
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

	private apiPsw(): Observable<RispostaServer> {
		return this.auth$.pipe(
			take(1),
			map((x: AuthType) => {
				const idUtente = x.idUtente;
				if (idUtente !== null) {
					const risorsa: [string, number] = ['passwords', idUtente];
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

	private postPsw(newPswData: NewPsw): Observable<RispostaServer> {
		return this.auth$.pipe(
			take(1),
			map((x: AuthType) => {
				const idUtente = x.idUtente;
				if (idUtente !== null) {
					const risorsa: [string, number] = ['passwords', idUtente];
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
					const ritorno = this.api.richiestaGenericaToken(risorsa, 'POST', headers, newPswData);

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
