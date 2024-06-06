import { Injectable } from '@angular/core';
import { ChiamataApiService } from './chiamata-api.service';
import { Observable, map, take } from 'rxjs';
import { RispostaServer } from '../interface/risposta-server';
import { Nazioni } from '../interface/nazioni.interface';
import { Province } from '../interface/province.interface';
import { ComuniItaliani } from '../interface/comuni.interface';
import { Config } from '../interface/config.interface';
import { TipoRecapito } from '../interface/tipo-recapito.interface';
import { TipoIndirizzi } from '../interface/tipo-indirizzo.interface';

@Injectable({
	providedIn: 'root',
})
export class ApiPublicService {
	constructor(private api: ChiamataApiService) {}

	//?---------------------------------------- OTTIENI DATI --------------------------------
	public getNazioni(): Observable<Nazioni[]> {
		return this.loadNazioni();
	}
	public getIdNazione(id: string): Observable<Nazioni> {
		return this.loadNazioneId(id);
	}

	public getProvince(): Observable<Province[]> {
		return this.loadProvince();
	}
	public getProvinciaId(id: string): Observable<Province> {
		return this.loadProvinciaId(id);
	}

	public getComuni(): Observable<ComuniItaliani[]> {
		return this.loadComuni();
	}
	public getComuneId(id: string): Observable<ComuniItaliani> {
		return this.loadComuneId(id);
	}

	public getSessioneConfig(): Observable<Config> {
		return this.loadConfigSession();
	}

	public getPswScad(): Observable<Config> {
		return this.loadPswScad();
	}

	public getTipoRecapitoId(id: string) {
		return this.loadTipoRecapitoId(id);
	}

	public getTipoIndirizziId(id: string) {
		return this.loadTipoIndirizzoId(id);
	}

	//!------------------------------------- PROTECTED ---------------------------------------------------
	protected loadNazioni(): Observable<Nazioni[]> {
		return this.getHttpNazioni().pipe(
			take(1),
			map((risposta: RispostaServer) => {
				if (risposta && risposta.data) {
					const arrayDiOggetti: {}[] = risposta.data.flat();
					// Trasforma l'array di oggetti in un array di oggetti di tipo Nazioni
					const arrayDiNazioni: Nazioni[] = arrayDiOggetti.map((oggetto: any) => {
						// Effettua la trasformazione degli oggetti in oggetti di tipo Nazioni
						const nazione: Nazioni = {
							idNazione: oggetto.idNazione,
							nome: oggetto.nome,
							continente: oggetto.continente,
							iso: oggetto.iso,
							iso3: oggetto.iso3,
							prefissoTel: oggetto.prefissoTel,
						};
						return nazione;
					});
					return arrayDiNazioni;
				} else {
					console.error('errore');
					return [];
				}
			}),
		);
	}
	protected loadNazioneId(id: string): Observable<Nazioni> {
		return this.getHttpNazioneId(id).pipe(
			take(1),
			map((risposta: RispostaServer) => {
				return risposta.data;
			}),
		);
	}

	protected loadProvince(): Observable<Province[]> {
		return this.getHttpProvince().pipe(
			take(1),
			map((risposta: RispostaServer) => {
				if (risposta && risposta.data) {
					const arrayDiOggetti: {}[] = risposta.data.flat();

					const arrayProvince: Province[] = arrayDiOggetti.map((oggetto: any) => {
						const provincia: Province = {
							provincia: oggetto.provincia,
						};
						return provincia;
					});
					return arrayProvince;
				} else {
					console.error('errore');
					return [];
				}
			}),
		);
	}
	protected loadProvinciaId(id: string): Observable<Province> {
		return this.getHttpProvinceId(id).pipe(
			take(1),
			map((risposta: RispostaServer) => {
				return risposta.data;
			}),
		);
	}

	protected loadComuni(): Observable<ComuniItaliani[]> {
		return this.getHttpComuni().pipe(
			take(1),
			map((risposta: RispostaServer) => {
				if (risposta && risposta.data) {
					const arrayDiOggetti: {}[] = risposta.data.flat();

					const arrayComuni: ComuniItaliani[] = arrayDiOggetti.map((oggetto: any) => {
						const comuni: ComuniItaliani = {
							idComuneItalia: oggetto.idComuneItalia,
							nome: oggetto.nome,
							regione: oggetto.regione,
							metropolitana: oggetto.metropolitana,
							provincia: oggetto.provincia,
							siglaAuto: oggetto.siglaAuto,
							codCatastale: oggetto.codCatastale,
							capoluogo: oggetto.capoluogo,
							multiCap: oggetto.multiCap,
							cap: oggetto.cap,
							capInizio: oggetto.capInizio,
							capFine: oggetto.capFine,
						};
						return comuni;
					});
					return arrayComuni;
				} else {
					console.error('errore');
					return [];
				}
			}),
		);
	}
	protected loadComuneId(id: string): Observable<ComuniItaliani> {
		return this.getHttpComuniId(id).pipe(
			take(1),
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}

	protected loadConfigSession(): Observable<Config> {
		return this.getHttpConfigId('3').pipe(
			take(1),
			map((risposta: RispostaServer) => {
				return risposta.data;
			}),
		);
	}
	protected loadPswScad(): Observable<Config> {
		return this.getHttpConfigId('5').pipe(
			take(1),
			map((risposta: RispostaServer) => {
				return risposta.data;
			}),
		);
	}

	protected loadTipoRecapitoId(id: string): Observable<TipoRecapito> {
		return this.getHttpIdTipoRecapito(id).pipe(
			take(1),
			map((risposta: RispostaServer) => {
				return risposta.data;
			}),
		);
	}
	protected loadTipoIndirizzoId(id: string): Observable<TipoIndirizzi> {
		return this.getHttpIdTipoIndirizzo(id).pipe(
			take(1),
			map((x: RispostaServer) => {
				return x.data;
			}),
		);
	}

	//!---------------------------------- PRIVATE ---------------------------------------------------------------
	private getHttpNazioni(): Observable<RispostaServer> {
		const risorsa: string[] = ['nazioni'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpNazioneId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['nazioni', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpTipoIndirizzi(): Observable<RispostaServer> {
		const risorsa: string[] = ['tipoIndirizzi'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpIdTipoIndirizzo(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['tipoIndirizzi', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpIdTipoRecapito(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['tipo-recapiti', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpConfig(): Observable<RispostaServer> {
		const risorsa: string[] = ['config'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpConfigId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['config', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpProvince(): Observable<RispostaServer> {
		const risorsa: string[] = ['province'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpProvinceId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['province', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpStati(): Observable<RispostaServer> {
		const risorsa: string[] = ['stati'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpStatiId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['stati', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpRuoli(): Observable<RispostaServer> {
		const risorsa: string[] = ['ruoli'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpRuoliId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['ruoli', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpAbilita(): Observable<RispostaServer> {
		const risorsa: string[] = ['abilita'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpAbilitaId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['abilita', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpComuni(): Observable<RispostaServer> {
		const risorsa: string[] = ['comuniItaliani'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	private getHttpComuniId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['comuniItaliani', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
}
