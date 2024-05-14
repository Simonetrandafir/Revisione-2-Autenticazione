import { Injectable, OnDestroy } from '@angular/core';
import { ChiamataApiService } from './chiamata-api.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { RispostaServer } from '../interface/risposta-server';
import { AuthType } from '../type/auth.type';
import { ObsTokenJwt } from './obs-token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class ApiGeneriService implements OnDestroy {
	private auth$: BehaviorSubject<AuthType>;
	private datiAuth: AuthType;
	private distruggi$ = new Subject<void>();

	constructor(private api: ChiamataApiService, private ObsJwt: ObsTokenJwt) {
		this.auth$ = this.ObsJwt.leggiObsAutorizza();
		this.datiAuth = this.auth$.getValue();
	}
	ngOnDestroy(): void {
		this.distruggi$.next();
		this.distruggi$.complete();
	}

	public getGeneri(): Observable<RispostaServer> {
		return this.apiGeneri();
	}

	protected apiGeneri(): Observable<RispostaServer> {
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
}
