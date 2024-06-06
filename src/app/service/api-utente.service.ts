import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, exhaustMap, map, of, switchMap, take } from 'rxjs';
import { AuthType } from '../type/auth.type';
import { ChiamataApiService } from './chiamata-api.service';
import { ObsTokenJwt } from './obs-token.service';
import { RispostaServer } from '../interface/risposta-server';
import { HttpHeaders } from '@angular/common/http';

import { Indirizzo } from '../interface/utente/indirizzo.interface';
import { Recapito } from '../interface/utente/recapito.interface';
import { Credito } from '../interface/utente/credito.interface';
import { Psw } from '../interface/utente/psw.interface';
import { NewPsw } from '../interface/utente/newPsw.interface';
import { Contatto } from '../interface/utente/contatto.interface';

@Injectable({
	providedIn: 'root',
})
export class ApiUtenteService {
	private auth$: BehaviorSubject<AuthType>;
	private datiAuth: AuthType;

	constructor(private api: ChiamataApiService, private ObsJwt: ObsTokenJwt) {
		this.auth$ = this.ObsJwt.leggiObsAutorizza();
		this.datiAuth = this.auth$.getValue();
	}

	public getUtente(): Observable<Contatto> {
		return this.loadUtente();
	}

	public getIndirizzo(): Observable<Indirizzo[]> {
		return this.loadIndirizzo();
	}

	public getRecapito(): Observable<Recapito[]> {
		return this.loadRecapito();
	}

	public getCredito(): Observable<Credito> {
		return this.loadCredito();
	}

	public getPsw(): Observable<Psw> {
		return this.loadPsw();
	}

	public setNewPsw(dataPsw: NewPsw): Observable<NewPsw> {
		return this.sendPsw(dataPsw);
	}

	//!-------------------------------------- PROTECTED --------------------------------------------
	protected loadUtente(): Observable<Contatto> {
		return this.apiUtente().pipe(
			take(1),
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}

	protected loadIndirizzo(): Observable<Indirizzo[]> {
		return this.apiIndirizzo().pipe(
			take(1),
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}

	protected loadRecapito(): Observable<Recapito[]> {
		return this.apiRecapito().pipe(
			take(1),
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}

	protected loadCredito(): Observable<Credito> {
		return this.apiCredito().pipe(
			take(1),
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}

	protected loadPsw(): Observable<Psw> {
		return this.apiPsw().pipe(
			take(1),
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}

	protected sendPsw(newPswData: NewPsw): Observable<Psw> {
		return this.postPsw(newPswData).pipe(
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}

	//!----------------------------------- PRIVATE --------------------------------------------------
	private apiUtente(): Observable<RispostaServer> {
		const idUtente = this.datiAuth.idUtente?.toString();
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token && idUtente) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			if (headers !== null) {
				const url: string[] = ['contatti', idUtente];
				const ritorno = this.api.richiestaGenericaToken(url, 'GET', headers).pipe(take(1));
				// console.log('TESTA PIENA', headers);

				return ritorno;
			} else {
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore AUS-1',
					error: 'token null',
				};
				// console.log('TESTA Vuota', headers);
				return of(msgError);
			}
			// console.log('TOKEN', token);
		} else {
			headers = null;
			const msgError: RispostaServer = {
				data: null,
				message: 'Errore AUS-2',
				error: 'token null',
			};
			return of(msgError);
			// console.error('testa vuota', headers);
		}
	}

	private apiIndirizzo(): Observable<RispostaServer> {
		const idUtente = this.datiAuth.idUtente?.toString();
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token && idUtente) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			if (headers !== null) {
				const url: string[] = ['indirizzi', idUtente];
				const ritorno = this.api.richiestaGenericaToken(url, 'GET', headers).pipe(take(1));
				// console.log('TESTA PIENA', headers);

				return ritorno;
			} else {
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore AUS-1',
					error: 'token null',
				};
				// console.log('TESTA Vuota', headers);
				return of(msgError);
			}
			// console.log('TOKEN', token);
		} else {
			headers = null;
			const msgError: RispostaServer = {
				data: null,
				message: 'Errore AUS-2',
				error: 'token null',
			};
			return of(msgError);
			// console.error('testa vuota', headers);
		}
	}

	private apiRecapito(): Observable<RispostaServer> {
		const idUtente = this.datiAuth.idUtente?.toString();
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token && idUtente) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			if (headers !== null) {
				const url: string[] = ['recapiti', idUtente];
				const ritorno = this.api.richiestaGenericaToken(url, 'GET', headers).pipe(take(1));
				// console.log('TESTA PIENA', headers);

				return ritorno;
			} else {
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore AUS-1',
					error: 'token null',
				};
				// console.log('TESTA Vuota', headers);
				return of(msgError);
			}
			// console.log('TOKEN', token);
		} else {
			headers = null;
			const msgError: RispostaServer = {
				data: null,
				message: 'Errore AUS-2',
				error: 'token null',
			};
			return of(msgError);
			// console.error('testa vuota', headers);
		}
	}

	private apiCredito(): Observable<RispostaServer> {
		const idUtente = this.datiAuth.idUtente?.toString();
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token && idUtente) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			if (headers !== null) {
				const url: string[] = ['crediti', idUtente];
				const ritorno = this.api.richiestaGenericaToken(url, 'GET', headers).pipe(take(1));
				// console.log('TESTA PIENA', headers);

				return ritorno;
			} else {
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore AUS-1',
					error: 'token null',
				};
				// console.log('TESTA Vuota', headers);
				return of(msgError);
			}
			// console.log('TOKEN', token);
		} else {
			headers = null;
			const msgError: RispostaServer = {
				data: null,
				message: 'Errore AUS-2',
				error: 'token null',
			};
			return of(msgError);
			// console.error('testa vuota', headers);
		}
	}

	private apiPsw(): Observable<RispostaServer> {
		const idUtente = this.datiAuth.idUtente?.toString();
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token && idUtente) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			if (headers !== null) {
				const url: string[] = ['passwords', idUtente];
				const ritorno = this.api.richiestaGenericaToken(url, 'GET', headers).pipe(take(1));
				// console.log('TESTA PIENA', headers);

				return ritorno;
			} else {
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore AUS-1',
					error: 'token null',
				};
				// console.log('TESTA Vuota', headers);
				return of(msgError);
			}
			// console.log('TOKEN', token);
		} else {
			headers = null;
			const msgError: RispostaServer = {
				data: null,
				message: 'Errore AUS-2',
				error: 'token null',
			};
			return of(msgError);
			// console.error('testa vuota', headers);
		}
	}

	private postPsw(newPswData: NewPsw): Observable<RispostaServer> {
		const idUtente = this.datiAuth.idUtente?.toString();
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token && idUtente) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			if (headers !== null && newPswData) {
				const url: string[] = ['passwords', idUtente];
				const ritorno = this.api.richiestaGenericaToken(url, 'POST', headers, newPswData);
				// console.log('TESTA PIENA', headers);

				return ritorno;
			} else {
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore AUS-1',
					error: 'token null',
				};
				// console.log('TESTA Vuota', headers);
				return of(msgError);
			}
			// console.log('TOKEN', token);
		} else {
			headers = null;
			const msgError: RispostaServer = {
				data: null,
				message: 'Errore AUS-2',
				error: 'token null',
			};
			return of(msgError);
			// console.error('testa vuota', headers);
		}
	}
}
