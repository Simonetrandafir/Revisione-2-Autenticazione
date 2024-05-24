import { Injectable } from '@angular/core';
import { ChiamataApiService } from './chiamata-api.service';
import { Observable, Subject, map } from 'rxjs';
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

	//?----------------------------------- DATI SUBJECT -----------------------------------
	private nazioniSub: Subject<Nazioni[]> = new Subject<Nazioni[]>();
	private nazioneIdSub: Subject<Nazioni> = new Subject<Nazioni>();
	private provinceSub: Subject<Province[]> = new Subject<Province[]>();
	private provinciaIdSub: Subject<Province> = new Subject<Province>();
	private comuniSub: Subject<ComuniItaliani[]> = new Subject<ComuniItaliani[]>();
	private comuneIdSub: Subject<ComuniItaliani> = new Subject<ComuniItaliani>();
	private sessionConfigSub: Subject<Config> = new Subject<Config>();
	private pswScadConfigSub: Subject<Config> = new Subject<Config>();
	private tipoRecapitoIdSub: Subject<TipoRecapito> = new Subject<TipoRecapito>();
	private tipoIndirizziIdSub: Subject<TipoIndirizzi> = new Subject<TipoIndirizzi>();

	//?---------------------------------------- OTTIENI DATI --------------------------------
	public getNazioni(): Subject<Nazioni[]> {
		this.loadNazioni();
		return this.nazioniSub;
	}
	public getIdNazione(id: string): Subject<Nazioni> {
		this.loadNazioneId(id);
		return this.nazioneIdSub;
	}

	public getProvince(): Subject<Province[]> {
		this.loadProvince();
		return this.provinceSub;
	}
	public getProvinciaId(id: string): Subject<Province> {
		this.loadProvinciaId(id);
		return this.provinciaIdSub;
	}

	public getComuni(): Subject<ComuniItaliani[]> {
		this.loadComuni();
		return this.comuniSub;
	}
	public getComuneId(id: string): Subject<ComuniItaliani> {
		this.loadComuneId(id);
		return this.comuneIdSub;
	}

	public getSessioneConfig(): Subject<Config> {
		this.loadConfigSession();
		return this.sessionConfigSub;
	}

	public getPswScad(): Subject<Config> {
		this.loadPswScad();
		return this.pswScadConfigSub;
	}

	public getTipoRecapitoId(id: string) {
		this.loadTipoRecapitoId(id);
		return this.tipoRecapitoIdSub;
	}

	public getTipoIndirizziId(id: string) {
		this.loadTipoIndirizzoId(id);
		return this.tipoIndirizziIdSub;
	}

	//!------------------------------------- PROTECTED ---------------------------------------------------
	protected loadNazioni(): void {
		this.getHttpNazioni()
			.pipe(
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
			)
			.subscribe((data: Nazioni[]) => {
				this.nazioniSub.next(data);
			});
	}
	protected loadNazioneId(id: string): void {
		this.getHttpNazioneId(id)
			.pipe(
				map((risposta: RispostaServer) => {
					return risposta.data;
				}),
			)
			.subscribe((data: Nazioni) => {
				this.nazioneIdSub.next(data);
			});
	}

	protected loadProvince(): void {
		this.getHttpProvince()
			.pipe(
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
			)
			.subscribe((data: Province[]) => {
				this.provinceSub.next(data);
			});
	}
	protected loadProvinciaId(id: string): void {
		this.getHttpProvinceId(id)
			.pipe(
				map((risposta: RispostaServer) => {
					return risposta.data;
				}),
			)
			.subscribe((dati: Province) => {
				this.provinciaIdSub.next(dati);
			});
	}

	protected loadComuni(): void {
		this.getHttpComuni()
			.pipe(
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
			)
			.subscribe((data: ComuniItaliani[]) => {
				this.comuniSub.next(data);
			});
	}
	protected loadComuneId(id: string): void {
		this.getHttpComuniId(id)
			.pipe(
				map((x: RispostaServer) => {
					return x.data;
				}),
			)
			.subscribe((data: ComuniItaliani) => {
				this.comuneIdSub.next(data);
			});
	}

	protected loadConfigSession(): void {
		this.getHttpConfigId('3')
			.pipe(
				map((risposta: RispostaServer) => {
					return risposta.data;
				}),
			)
			.subscribe((data: Config) => {
				this.sessionConfigSub.next(data);
			});
	}
	protected loadPswScad(): void {
		this.getHttpConfigId('5')
			.pipe(
				map((risposta: RispostaServer) => {
					return risposta.data;
				}),
			)
			.subscribe((data: Config) => {
				this.pswScadConfigSub.next(data);
			});
	}

	protected loadTipoRecapitoId(id: string): void {
		this.getHttpIdTipoRecapito(id)
			.pipe(
				map((risposta: RispostaServer) => {
					return risposta.data;
				}),
			)
			.subscribe((data: TipoRecapito) => {
				this.tipoRecapitoIdSub.next(data);
			});
	}
	protected loadTipoIndirizzoId(id: string): void {
		this.getHttpIdTipoIndirizzo(id)
			.pipe(
				map((x: RispostaServer) => {
					return x.data;
				}),
			)
			.subscribe((data: TipoIndirizzi) => {
				this.tipoIndirizziIdSub.next(data);
			});
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
