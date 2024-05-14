import { Injectable } from '@angular/core';
import { Observable, concatMap, map, take, tap } from 'rxjs';
import { RispostaServer } from '../interface/risposta-server';
import { UtilityService } from './utility.service';
import { ChiamataApiService } from './chiamata-api.service';

@Injectable({
	providedIn: 'root',
})
export class ApiAccessoService {
	readonly server: string = '/api';
	readonly versione: string = '/v1';

	constructor(private api: ChiamataApiService) {}

	/**
	 * Funzione che manda l'utente CIFRATO all'api del server per l'accesso
	 *
	 * @requires js-sha512
	 * @param email string
	 * @returns Observable
	 */
	protected getLoginFase1(hashUser: string, hashEmail: string): Observable<RispostaServer> {
		const risorsa: string[] = ['accedi', hashUser, hashEmail];
		const tmp = this.api.richiestaGenerica(risorsa, 'GET');
		return tmp;
	}

	/**
	 * Funzione finale di accesso che manda utente e password CIFRATI al server
	 *
	 * @requires js-sha512
	 * @param hashEmail string
	 * @param hashPsw string
	 * @returns Observable
	 */
	protected getLoginFase2(hashUser: string, hashEmail: string, hashPsw: string): Observable<RispostaServer> {
		const risorsa: string[] = ['accedi', hashUser, hashEmail, hashPsw];
		const tmp = this.api.richiestaGenerica(risorsa, 'GET');
		return tmp;
	}

	/**
	 * Effettua login richiamando le due funzioni di chiamata api e passando i dati dopo l'HASH
	 *
	 * @requires UtilityService
	 * @param username string
	 * @param psw string
	 * @returns Observable
	 */
	public login(username: string, email: string, psw: string): Observable<RispostaServer> {
		const hashUser: string = UtilityService.hashString(username);
		const hashEmail: string = UtilityService.hashString(email);
		const hashPsw: string = UtilityService.hashString(psw);
		const ctrl$ = this.getLoginFase1(hashUser, hashEmail).pipe(
			take(1),
			// tap((x) => console.log('Dati: ', x)),
			map((x: RispostaServer): string => {
				const sale: string = x.data.sale;
				const hashPswSale = UtilityService.hashPswSale(hashPsw, sale);
				return hashPswSale;
			}),
			concatMap((x: string) => {
				return this.getLoginFase2(hashUser, hashEmail, x);
			}),
		);
		return ctrl$;
	}
}
