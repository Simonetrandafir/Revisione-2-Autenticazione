import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RichiestaApi } from '../type/richiestaApi.type';
import { ChiamataHttp } from '../type/chiamataHttp.type';
import { Observable } from 'rxjs';
import { RispostaServer } from '../interface/risposta-server';

@Injectable({
	providedIn: 'root',
})
export class ChiamataApiService {
	readonly server: string = '/api';
	readonly versione: string = '/v1';

	constructor(private http: HttpClient) {}

	/**
	 *
	 * @param risorsa (string|number)[]
	 * @const server 'http://localhost/Codex/public/api'
	 * @const versione '/v1'
	 * @returns url string
	 */
	public calcolaRisorsa(risorsa: (string | number)[], richiesta?: RichiestaApi): string {
		let url = '';
		if (richiesta) {
			url = this.server + this.versione + '/' + richiesta + '/';
		} else {
			url = this.server + this.versione + '/';
		}

		url = url + risorsa.join('/');
		return url;
	}

	/**
	 *
	 * @param risorsa (string|number)[]
	 * @param tipo string 'GET''POST''PUT''DELETE'
	 * @param parametri Object|null
	 * @returns Observable
	 */
	public richiestaGenerica(risorsa: (string | number)[], tipo: ChiamataHttp, parametri?: Object | null): Observable<RispostaServer> {
		let url = this.calcolaRisorsa(risorsa);
		switch (tipo) {
			case 'GET':
				console.log(url);
				return this.http.get<RispostaServer>(url);
			case 'POST':
				if (parametri !== null) {
					url = this.calcolaRisorsa(risorsa, 'salva');
					// console.log('Entro in: ' + url);
					//console.log('header: ',httpHead)

					return this.http.post<RispostaServer>(url, parametri);
				} else {
					const obsError = {
						data: null,
						message: null,
						error: 'Errore RG API POST',
					};
					const $errori = new Observable<RispostaServer>((subscriber) => subscriber.next(obsError));
					return $errori;
				}
			case 'PUT':
				if (parametri !== null) {
					url = this.calcolaRisorsa(risorsa, 'aggiorna');

					return this.http.put<RispostaServer>(url, parametri);

					// console.log('Entro in: ' + url);
				} else {
					const obsError = {
						data: null,
						message: null,
						error: 'Errore RG API PUT',
					};
					const $errori = new Observable<RispostaServer>((subscriber) => subscriber.next(obsError));
					return $errori;
				}
			case 'DELETE':
				url = this.calcolaRisorsa(risorsa, 'distruggi');

				return this.http.delete<RispostaServer>(url);

			// console.log('Entro in: ' + url);
			default:
				const obsError = {
					data: null,
					message: null,
					error: 'Errore Default',
				};
				const $errori = new Observable<RispostaServer>((subscriber) => subscriber.next(obsError));
				return $errori;
		}
	}

	public richiestaGenericaToken(
		risorsa: (string | number)[],
		tipo: ChiamataHttp,
		headers: HttpHeaders | undefined,
		parametri?: Object | null,
	): Observable<RispostaServer> {
		let url = this.calcolaRisorsa(risorsa);
		const httpHead = headers ? { headers } : undefined;
		switch (tipo) {
			case 'GET':
				if (httpHead !== undefined) {
					// console.log('Piena', httpHead);
					return this.http.get<RispostaServer>(url, httpHead);
				} else {
					// console.log('Vuota', httpHead);

					return this.http.get<RispostaServer>(url);
				}
			case 'POST':
				if (parametri !== null) {
					url = this.calcolaRisorsa(risorsa, 'salva');
					// console.log('Entro in: ' + url);
					//console.log('header: ',httpHead)
					if (httpHead !== undefined) {
						return this.http.post<RispostaServer>(url, httpHead, parametri);
					} else {
						return this.http.post<RispostaServer>(url, parametri);
					}
				} else {
					const obsError = {
						data: null,
						message: null,
						error: 'Errore RG API POST',
					};
					const $errori = new Observable<RispostaServer>((subscriber) => subscriber.next(obsError));
					return $errori;
				}
			case 'PUT':
				if (parametri !== null) {
					url = this.calcolaRisorsa(risorsa, 'aggiorna');
					if (httpHead !== undefined) {
						return this.http.put<RispostaServer>(url, httpHead, parametri);
					} else {
						return this.http.put<RispostaServer>(url, parametri);
					}
					// console.log('Entro in: ' + url);
				} else {
					const obsError = {
						data: null,
						message: null,
						error: 'Errore RG API PUT',
					};
					const $errori = new Observable<RispostaServer>((subscriber) => subscriber.next(obsError));
					return $errori;
				}
			case 'DELETE':
				url = this.calcolaRisorsa(risorsa, 'distruggi');
				if (httpHead !== undefined) {
					return this.http.delete<RispostaServer>(url, httpHead);
				} else {
					return this.http.delete<RispostaServer>(url);
				}
			// console.log('Entro in: ' + url);
			default:
				const obsError = {
					data: null,
					message: null,
					error: 'Errore Default',
				};
				const $errori = new Observable<RispostaServer>((subscriber) => subscriber.next(obsError));
				return $errori;
		}
	}
}
