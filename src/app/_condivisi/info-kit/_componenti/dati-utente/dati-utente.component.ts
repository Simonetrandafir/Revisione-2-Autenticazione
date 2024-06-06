import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, concatMap, exhaustMap, forkJoin, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { ComuniItaliani } from 'src/app/interface/comuni.interface';
import { Nazioni } from 'src/app/interface/nazioni.interface';

import { Contatto } from 'src/app/interface/utente/contatto.interface';
import { Indirizzo } from 'src/app/interface/utente/indirizzo.interface';
import { Recapito } from 'src/app/interface/utente/recapito.interface';
import { Utente } from 'src/app/interface/utente/utente.interface';
import { ApiPublicService } from 'src/app/service/api-public.service';
import { ApiUtenteService } from 'src/app/service/api-utente.service';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-dati-utente',
	templateUrl: './dati-utente.component.html',
	styleUrls: ['./dati-utente.component.scss'],
})
export class DatiUtenteComponent implements OnDestroy, OnInit {
	private destroy$: Subject<void> = new Subject<void>();
	private datiAuth: AuthType;

	protected obsUtente$: Observable<Utente> | null = null;

	constructor(private apiUtente: ApiUtenteService, private apiPublic: ApiPublicService, private token: ObsTokenJwt) {
		this.datiAuth = this.token.leggiObsAutorizza().getValue();
	}

	ngOnInit(): void {
		this.obsUtente$ = this.apiUtente.getUtente().pipe(
			takeUntil(this.destroy$),
			exhaustMap((contatto: Contatto) => {
				const data: Utente = {
					idContatto: contatto.idContatto,
					idStato: contatto.idStato,
					ruolo: this.datiAuth.idRuolo ? (this.datiAuth.idRuolo === 1 ? 'Admin' : 'Utente') : 'Errore',
					nome: contatto.nome,
					cognome: contatto.cognome,
					sesso: contatto.sesso ? (contatto.sesso === 1 ? 'Maschio' : 'Femmina') : 'Non definito',
					codFiscale: contatto.codFiscale,
					partitaIva: contatto.partitaIva !== null ? contatto.partitaIva : 'Non definita',
					cittadinanza: contatto.cittadinanza,
					idNazione: contatto.idNazione,
					citta: contatto.citta ? contatto.citta : 'Non definita',
					provincia: contatto.provincia ? contatto.provincia : 'Non definita',
					dataNascita: contatto.dataNascita,
					indirizzi: [],
					recapiti: [],
				};

				return this.apiUtente.getIndirizzo().pipe(
					take(1),
					concatMap((indirizzi: Indirizzo[]) => {
						// Recupera i dati salvati nel localStorage
						const comuni: ComuniItaliani[] = JSON.parse(localStorage.getItem('comuniItalia') || '[]');
						const nazioni: Nazioni[] = JSON.parse(localStorage.getItem('nazioni') || '[]');

						const indirizziDettagli$ = indirizzi.map((indirizzo) =>
							forkJoin({
								tipoIndirizzo: this.apiPublic.getTipoIndirizziId(indirizzo.idTipoIndirizzo.toString()).pipe(take(1)),
							}).pipe(
								map(({ tipoIndirizzo }) => {
									const comune = comuni.find((comune) => comune.idComuneItalia === indirizzo.idComuneItalia);
									const provincia = comune?.provincia || comune?.metropolitana;
									const nazione = nazioni.find((nazione) => nazione.idNazione === indirizzo.idNazione);

									indirizzo.comune = comune?.nome || 'Sconosciuto';
									indirizzo.nazione = nazione?.nome || 'Sconosciuto';
									indirizzo.tipoIndirizzo = tipoIndirizzo?.nome || 'Sconosciuto';
									indirizzo.provincia = provincia;
									return indirizzo;
								}),
							),
						);

						return forkJoin(indirizziDettagli$).pipe(
							tap((x: Indirizzo[]) => {
								data.indirizzi = x;
							}),
							map(() => data),
						);
					}),
				);
			}),
			concatMap((data: Utente) => {
				return this.apiUtente.getRecapito().pipe(
					take(1),
					switchMap((recapiti: Recapito[]) => {
						if (recapiti.length > 0) {
							recapiti.forEach((recapito) => {
								data.recapiti.push(recapito);
							});
							const recapitoDettagli$ = recapiti.map((recapito) =>
								forkJoin({
									tipoRecapito: this.apiPublic.getTipoRecapitoId(recapito.idTipoRecapito.toString()).pipe(take(1)),
								}).pipe(
									map(({ tipoRecapito }) => {
										recapito.tipoRecapito = tipoRecapito?.nome || 'Sconosciuto';
										return recapito;
									}),
								),
							);

							return forkJoin(recapitoDettagli$).pipe(
								tap((x: Recapito[]) => {
									data.recapiti = x;
									console.log(data);
								}),
								map(() => data),
							);
						} else {
							return of(data);
						}
					}),
				);
			}),
		);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
