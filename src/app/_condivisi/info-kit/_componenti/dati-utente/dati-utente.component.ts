import { Component, OnDestroy } from '@angular/core';
import { Subject, concatMap, exhaustMap, of, switchMap, take, takeUntil } from 'rxjs';
import { ComuniItaliani } from 'src/app/interface/comuni.interface';
import { Nazioni } from 'src/app/interface/nazioni.interface';
import { TipoIndirizzi } from 'src/app/interface/tipo-indirizzo.interface';
import { TipoRecapito } from 'src/app/interface/tipo-recapito.interface';
import { Indirizzo } from 'src/app/interface/utente/indirizzo.interface';
import { Recapito } from 'src/app/interface/utente/recapito.interface';
import { Utente } from 'src/app/interface/utente/utente.interface';
import { ApiPublicService } from 'src/app/service/api-public.service';
import { ApiUtenteService } from 'src/app/service/api-utente.service';
@Component({
	selector: 'app-dati-utente',
	templateUrl: './dati-utente.component.html',
	styleUrls: ['./dati-utente.component.scss'],
})
export class DatiUtenteComponent implements OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();

	constructor(private apiUtente: ApiUtenteService, private apiPublic: ApiPublicService) {
		this.apiUtente
			.getUtente()
			.pipe(
				take(1),
				switchMap((utenti: Utente) => {
					this.dataUtente = utenti;
					return this.apiUtente.getIndirizzo().pipe(
						takeUntil(this.destroy$),
						concatMap((data: Indirizzo[], index: number) => {
							data.map((x: Indirizzo) => {
								const idNazione: string = x.idNazione.toString();
								this.apiPublic.getIdNazione(idNazione).subscribe((x: Nazioni) => {
									if (!this.dataNazione.find((n: Nazioni) => n.idNazione === x.idNazione)) {
										this.dataNazione.push(x);
									}
								});
								let idComune: string = x.idComuneItalia.toString();
								this.apiPublic.getComuneId(idComune).subscribe((x: ComuniItaliani) => {
									if (!this.dataComune.find((c: ComuniItaliani) => c.idComuneItalia === x.idComuneItalia)) {
										this.dataComune.push(x);
									}
								});
								let idTipo: string = x.idTipoIndirizzo.toString();
								this.apiPublic.getTipoIndirizziId(idTipo).subscribe((x: TipoIndirizzi) => {
									if (!this.dataTipoIndirizzo.find((t: TipoIndirizzi) => t.idTipoIndirizzo === x.idTipoIndirizzo)) {
										this.dataTipoIndirizzo.push(x);
									}
								});
								this.dataIndirizzi.push(x);
							});

							return this.apiUtente.getRecapito().pipe(
								takeUntil(this.destroy$),
								concatMap((x: Recapito[], index: number) => {
									x.map((x: Recapito) => {
										const idTipoRecapito: string = x.idTipoRecapito.toString();
										this.apiPublic.getTipoRecapitoId(idTipoRecapito).subscribe((data: TipoRecapito) => {
											if (!this.dataTipoRecapito.find((t: TipoRecapito) => t.idTipoRecapito === data.idTipoRecapito)) {
												this.dataTipoRecapito.push(data);
											}
										});
										this.dataRecapiti.push(x);
									});
									return of(x);
								}),
							);
						}),
					);
				}),
			)
			.subscribe((data: Recapito[]) => {
				this.controlloDati();
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	//------------------------- SET VISTA PROFILO ------------------------
	dataUtente: Utente | null = null;

	dataIndirizzi: Indirizzo[] = [];

	dataComune: ComuniItaliani[] = [];

	dataNazione: Nazioni[] = [];

	dataRecapiti: Recapito[] = [];

	dataTipoRecapito: TipoRecapito[] = [];

	dataTipoIndirizzo: TipoIndirizzi[] = [];

	protected ctrlData: boolean = false;

	private controlloDati(): void {
		const datiLoad: boolean = !(
			this.dataIndirizzi.length !== 0 &&
			this.dataComune.length !== 0 &&
			this.dataNazione.length !== 0 &&
			this.dataRecapiti.length !== 0 &&
			this.dataTipoIndirizzo.length !== 0 &&
			this.dataTipoRecapito.length !== 0 &&
			this.dataUtente !== null
		);

		console.log(this.dataComune);
		console.log(this.dataIndirizzi);
		console.log(this.dataNazione);
		console.log(this.dataRecapiti);
		console.log(this.dataTipoIndirizzo);
		console.log(this.dataTipoRecapito);
		console.log(this.dataUtente);
		this.ctrlData = datiLoad;
	}
}
