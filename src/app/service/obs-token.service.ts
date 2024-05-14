import { Injectable } from '@angular/core';
import { AuthType } from '../type/auth.type';
import { BehaviorSubject } from 'rxjs';
import { MsgUtenteService } from './msg-utente.service';
import { MsgUtenteT } from '../type/msgUtente.type';
import { ChiamataApiService } from './chiamata-api.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'any',
})
export class ObsTokenJwt {
	private static autorizza: AuthType;

	private obsAutorizza$: BehaviorSubject<AuthType>;
	msg$: BehaviorSubject<MsgUtenteT>;

	constructor(private msgService: MsgUtenteService, private api: ChiamataApiService, private router: Router) {
		try {
			// Verifica se il browser supporta localStorage
			if (typeof Storage !== 'undefined' && typeof window.localStorage !== 'undefined') {
				ObsTokenJwt.autorizza = this.leggiAuthLocalStorage();
			}
			// Verifica se il browser supporta sessionStorage
			if (typeof Storage !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
				if (ObsTokenJwt.autorizza.token === null) {
					ObsTokenJwt.autorizza = this.leggiSessioneAuth();
				}
			}
		} catch (error) {
			const msgUtente: MsgUtenteT = {
				mostra: true,
				type: 'error',
				msg: 'Impossibile accedere ai coockie, ti preghiamo di non bloccare i coockie cosi da consentirci di poter validare i dati di accesso. \
				Ci teniamo alla tua sicurezza e non verranno usati coockie di tracciamento o che compromettano la rua privacy.',
			};
			this.msgService.setObsMsg(msgUtente);
			this.msgService.autoClose(10000);
		}

		this.msg$ = this.msgService.leggiObsMsg();
		this.obsAutorizza$ = new BehaviorSubject<AuthType>(ObsTokenJwt.autorizza);
	}

	leggiObsAutorizza() {
		return this.obsAutorizza$;
	}

	setObsAutorizza(dati: AuthType) {
		ObsTokenJwt.autorizza = dati;
		return this.obsAutorizza$.next(dati);
	}

	/**
	 * Scrive tokenCodex sul LocalStorage che is il database locale di ogni browser
	 *
	 * @param auth Object AuthType
	 * @returns void
	 */
	scriviSuLocalStorage(auth: AuthType): void {
		const tmp: string = JSON.stringify(auth);
		return localStorage.setItem('tokenCodex', tmp);
	}

	/**
	 * Legge la varibaile auth nel Local Storage
	 *
	 * @returns Object AuthType
	 */
	leggiAuthLocalStorage(): AuthType {
		const tmp: string | null = localStorage.getItem('tokenCodex');
		let auth: AuthType;
		if (tmp !== null) {
			auth = JSON.parse(tmp);
		} else {
			auth = {
				idLingua: 1,
				idUtente: null,
				idRuolo: null,
				idStato: null,
				token: null,
				nome: null,
				abilita: null,
				avvioSessione: null,
			};
		}
		return auth;
	}

	/**
	 * Scrive i dati per accedere nello storage di sessione
	 *
	 * @param auth AuthType
	 */
	scriviSuSessione(auth: AuthType): void {
		const tmp: string = JSON.stringify(auth);
		sessionStorage.setItem('tokenCodex', tmp);
	}

	/**
	 * Legge il token nello storage di sessione. Se non presente ritorna null
	 *
	 * @returns AuthType
	 */
	leggiSessioneAuth(): AuthType {
		const tmp: string | null = sessionStorage.getItem('tokenCodex');
		let auth: AuthType;
		if (tmp !== null) {
			auth = JSON.parse(tmp);
		} else {
			auth = {
				idLingua: 1,
				idUtente: null,
				idRuolo: null,
				idStato: null,
				token: null,
				nome: null,
				abilita: null,
				avvioSessione: null,
			};
		}
		return auth;
	}
}
