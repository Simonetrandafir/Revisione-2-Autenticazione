import { Injectable } from '@angular/core';
import { ChiamataApiService } from './chiamata-api.service';
import { BehaviorSubject, Observable, Subject, map, of, take } from 'rxjs';
import { RispostaServer } from '../interface/risposta-server';
import { AuthType } from '../type/auth.type';
import { ObsTokenJwt } from './obs-token.service';
import { HttpHeaders } from '@angular/common/http';
import { Generi } from '../interface/generi.interface';

@Injectable({
	providedIn: 'root',
})
export class ApiGeneriService {
	private auth$: BehaviorSubject<AuthType>;
	private datiAuth: AuthType;

	constructor(private api: ChiamataApiService, private ObsJwt: ObsTokenJwt) {
		this.auth$ = this.ObsJwt.leggiObsAutorizza();
		this.datiAuth = this.auth$.getValue();
	}

	public getGeneri(): Observable<Generi[]> {
		return this.loadGeneri();
	}
	public getGenereId(idGenere: string): Observable<Generi> {
		return this.loadGenereId(idGenere);
	}

	//!-------------------------------------- PROTECTED --------------------------------------------
	protected loadGeneri(): Observable<Generi[]> {
		return this.apiGeneri().pipe(
			take(1),
			map((risposta: RispostaServer) => {
				if (risposta && risposta.data) {
					const arrayDiOggetti: {}[] = risposta.data.flat();
					// Trasforma l'array di oggetti in un array di oggetti di tipo Nazioni
					const arrGeneri: Generi[] = arrayDiOggetti.map((oggetto: any) => {
						// Effettua la trasformazione degli oggetti in oggetti di tipo Nazioni
						const genere: Generi = {
							idGenere: oggetto.idGenere,
							nome: oggetto.nome,
							sku: oggetto.sku,
						};
						return genere;
					});
					return arrGeneri;
				} else {
					console.error('errore');
					return [];
				}
			}),
		);
	}

	protected loadGenereId(idGenere: string): Observable<Generi> {
		return this.apiGenereId(idGenere).pipe(
			take(1),
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}

	//!-------------------------------------- PRIVATE --------------------------------------------
	private apiGeneri(): Observable<RispostaServer> {
		const risorsa: string[] = ['generi'];
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			// console.log('TOKEN', token);
		} else {
			headers = null;
			// console.error('testa vuota', headers);
		}
		if (headers !== null) {
			const ritorno = this.api.richiestaGenericaToken(risorsa, 'GET', headers);
			// console.log('TESTA PIENA', headers);

			return ritorno;
		} else {
			const msgError: RispostaServer = {
				data: null,
				message: 'Errore Log in',
				error: 'token null',
			};
			// console.log('TESTA Vuota', headers);
			return of(msgError);
		}
		// console.log('RITORNO', ritorno);
	}

	private apiGenereId(idGenere: string): Observable<RispostaServer> {
		const risorsa: string[] = ['generi', idGenere];
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			// console.log('TOKEN', token);
		} else {
			headers = null;
			// console.error('testa vuota', headers);
		}
		if (headers !== null) {
			const ritorno = this.api.richiestaGenericaToken(risorsa, 'GET', headers);
			// console.log('TESTA PIENA', headers);

			return ritorno;
		} else {
			const msgError: RispostaServer = {
				data: null,
				message: 'Errore Log in',
				error: 'token null',
			};
			// console.log('TESTA Vuota', headers);
			return of(msgError);
		}
		// console.log('RITORNO', ritorno);
	}
}
