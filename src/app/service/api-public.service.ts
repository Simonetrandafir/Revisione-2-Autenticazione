import { Injectable } from '@angular/core';
import { ChiamataApiService } from './chiamata-api.service';
import { Observable } from 'rxjs';
import { RispostaServer } from '../interface/risposta-server';

@Injectable({
	providedIn: 'root',
})
export class ApiPublicService {
	constructor(private api: ChiamataApiService) {}

	public getHttpNazioni(): Observable<RispostaServer> {
		const risorsa: string[] = ['nazioni'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpNazioneId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['nazioni', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpTipoIndirizzi(): Observable<RispostaServer> {
		const risorsa: string[] = ['tipoIndirizzi'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpIdTipoIndirizzo(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['tipoIndirizzi', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpConfig(): Observable<RispostaServer> {
		const risorsa: string[] = ['config'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpConfigId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['config', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpProvince(): Observable<RispostaServer> {
		const risorsa: string[] = ['province'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpProvinceId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['province', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpStati(): Observable<RispostaServer> {
		const risorsa: string[] = ['stati'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpStatiId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['stati', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpRuoli(): Observable<RispostaServer> {
		const risorsa: string[] = ['ruoli'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpRuoliId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['ruoli', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpAbilita(): Observable<RispostaServer> {
		const risorsa: string[] = ['abilita'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpAbilitaId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['abilita', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpComuni(): Observable<RispostaServer> {
		const risorsa: string[] = ['comuniItaliani'];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
	public getHttpComuniId(id: string): Observable<RispostaServer> {
		const risorsa: string[] = ['comuniItaliani', id];
		return this.api.richiestaGenerica(risorsa, 'GET');
	}
}
