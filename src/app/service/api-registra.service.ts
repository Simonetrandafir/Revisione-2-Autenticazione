import { Injectable } from '@angular/core';
import { ChiamataApiService } from './chiamata-api.service';
import { RegistraDati } from '../interface/registra.interface';
import { Observable } from 'rxjs';
import { RispostaServer } from '../interface/risposta-server';

@Injectable({
	providedIn: 'root',
})
export class ApiRegistraService {
	constructor(private api: ChiamataApiService) {}

	//!----------------------------- PUBLIC ----------------------------------------------------------
	public sendRegistra(data: RegistraDati): Observable<RispostaServer> {
		return this.apiRegistra(data);
	}
	//!----------------------------- PRIVATE ----------------------------------------------------------
	private apiRegistra(data: RegistraDati): Observable<RispostaServer> {
		const url: string[] = ['registra'];
		return this.api.richiestaGenerica(url, 'POST', data);
	}
}
