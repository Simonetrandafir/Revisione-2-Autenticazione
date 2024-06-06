import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, exhaustMap, map, of, take } from 'rxjs';
import { AuthType } from '../type/auth.type';
import { ChiamataApiService } from './chiamata-api.service';
import { ObsTokenJwt } from './obs-token.service';
import { RispostaServer } from '../interface/risposta-server';
import { HttpHeaders } from '@angular/common/http';
import { Contatto } from '../interface/utente/contatto.interface';
import { Utente } from '../interface/utente/utente.interface';
import { Indirizzo } from '../interface/utente/indirizzo.interface';
import { UtilityService } from './utility.service';
import { Recapito } from '../interface/utente/recapito.interface';
import { ComuniItaliani } from '../interface/comuni.interface';
import { Nazioni } from '../interface/nazioni.interface';

@Injectable({
	providedIn: 'root',
})
export class ApiAdminService {
	private auth$: BehaviorSubject<AuthType>;
	private datiAuth: AuthType;

	constructor(private api: ChiamataApiService, private ObsJwt: ObsTokenJwt) {
		this.auth$ = this.ObsJwt.leggiObsAutorizza();
		this.datiAuth = this.auth$.getValue();
	}

	//!--------------------------------- PUBLIC ----------------------------------------------
	public getIndexUtenti(): Observable<Utente[]> {
		return this.loadIndexUtenti();
	}
	public getIndexIndirizzi(): Observable<Indirizzo[]> {
		return this.loadIndexIndirizzi();
	}
	public getIndexRecapiti(): Observable<Recapito[]> {
		return this.loadIndexRecapiti();
	}
	//!-------------------------------- PROTECTED ---------------------------------------------
	protected loadIndexUtenti(): Observable<Utente[]> {
		return this.indexUtenti().pipe(
			take(1),
			map((risposta: RispostaServer) => {
				if (risposta && risposta.data) {
					console.log(risposta.data);
					// Trasforma l'array di oggetti in un array di oggetti di tipo Nazioni
					const ritorno: Utente[] = risposta.data.map((oggetto: Utente) => {
						// Effettua la trasformazione degli oggetti in oggetti di tipo Nazioni
						const utente: Utente = {
							idContatto: oggetto.idContatto,
							idStato: oggetto.idStato,
							nome: UtilityService.capitalizza(oggetto.nome),
							cognome: UtilityService.capitalizza(oggetto.cognome),
							sesso: oggetto.sesso ? (parseInt(oggetto.sesso) === 1 ? 'Maschio' : 'Femmina') : 'Non definito',
							codFiscale: oggetto.codFiscale !== null ? oggetto.codFiscale : 'Null',
							partitaIva: oggetto.partitaIva !== null ? oggetto.partitaIva : 'Null',
							cittadinanza: oggetto.cittadinanza !== null ? UtilityService.capitalizza(oggetto.cittadinanza) : 'Null',
							idNazione: oggetto.idNazione,
							citta: oggetto.citta !== null ? oggetto.citta : 'Null',
							provincia: oggetto.provincia !== null ? oggetto.provincia : 'Null',
							dataNascita: oggetto.dataNascita,
							indirizzi: oggetto.indirizzi,
							recapiti: oggetto.recapiti,
						};
						return utente;
					});
					return ritorno;
				} else {
					console.error('AAS-0001');
					return [];
				}
			}),
		);
	}
	protected loadIndexIndirizzi(): Observable<Indirizzo[]> {
		return this.indexIndirizzi().pipe(
			take(1),
			map((risposta: RispostaServer) => {
				if (risposta && risposta.data) {
					console.log(risposta.data);
					// Trasforma l'array di oggetti in un array di oggetti di tipo Nazioni
					const comuni: ComuniItaliani[] = JSON.parse(localStorage.getItem('comuniItalia') || '[]');
					const nazioni: Nazioni[] = JSON.parse(localStorage.getItem('nazioni') || '[]');

					const ritorno: Indirizzo[] = risposta.data.map((oggetto: Indirizzo) => {
						const comune = comuni.find((comune) => comune.idComuneItalia === oggetto.idComuneItalia);
						const provincia = comune?.provincia || comune?.metropolitana;
						const nazione = nazioni.find((nazione) => nazione.idNazione === oggetto.idNazione);
						// Effettua la trasformazione degli oggetti in oggetti di tipo Nazioni
						const indirizzo: Indirizzo = {
							idIndirizzo: oggetto.idIndirizzo,
							idTipoIndirizzo: oggetto.idTipoIndirizzo,
							tipoIndirizzo: '',
							idContatto: oggetto.idContatto,
							idNazione: oggetto.idNazione,
							nazione: (oggetto.comune = nazione?.nome || undefined),
							idComuneItalia: oggetto.idComuneItalia,
							comune: (oggetto.nazione = comune?.nome || undefined),
							provincia: provincia || undefined,
							preferito: oggetto.preferito,
							cap: oggetto.cap,
							indirizzo: oggetto.indirizzo,
							civico: oggetto.civico,
							citta: oggetto.citta,
						};
						return indirizzo;
					});
					return ritorno;
				} else {
					console.error('AAS-0001');
					return [];
				}
			}),
		);
	}
	protected loadIndexRecapiti(): Observable<Recapito[]> {
		return this.indexRecapiti().pipe(
			take(1),
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}
	//!----------------------------------- PRIVATE ----------------------------------------
	private indexUtenti(): Observable<RispostaServer> {
		const idUtente = this.datiAuth.idUtente;
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token && idUtente && idUtente === 1) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			if (headers !== null) {
				const url: string[] = ['contatti?tipo=completo'];
				const ritorno = this.api.richiestaGenericaToken(url, 'GET', headers).pipe(take(1));
				// console.log('TESTA PIENA', headers);

				return ritorno;
			} else {
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore AAS-1',
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
				message: 'Errore AAS-2',
				error: 'token null',
			};
			return of(msgError);
			// console.error('testa vuota', headers);
		}
	}

	private indexRecapiti(): Observable<RispostaServer> {
		const idUtente = this.datiAuth.idUtente;
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token && idUtente && idUtente === 1) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			if (headers !== null) {
				const url: string[] = ['recapiti'];
				const ritorno = this.api.richiestaGenericaToken(url, 'GET', headers).pipe(take(1));
				// console.log('TESTA PIENA', headers);

				return ritorno;
			} else {
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore AAS-1',
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
				message: 'Errore AAS-2',
				error: 'token null',
			};
			return of(msgError);
			// console.error('testa vuota', headers);
		}
	}

	private indexIndirizzi(): Observable<RispostaServer> {
		const idUtente = this.datiAuth.idUtente;
		const token = this.datiAuth.token;
		let headers: HttpHeaders | null;
		if (token && idUtente && idUtente === 1) {
			headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			if (headers !== null) {
				const url: string[] = ['indirizzi'];
				const ritorno = this.api.richiestaGenericaToken(url, 'GET', headers).pipe(take(1));
				// console.log('TESTA PIENA', headers);

				return ritorno;
			} else {
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore AAS-1',
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
				message: 'Errore AAS-2',
				error: 'token null',
			};
			return of(msgError);
			// console.error('testa vuota', headers);
		}
	}
}
