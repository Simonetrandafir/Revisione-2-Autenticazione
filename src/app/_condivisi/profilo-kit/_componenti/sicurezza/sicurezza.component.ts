import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, take, switchMap, map } from 'rxjs/operators';
import { Config } from 'src/app/interface/config.interface';
import { Psw } from 'src/app/interface/utente/psw.interface';
import { ApiPublicService } from 'src/app/service/api-public.service';
import { ApiUtenteService } from 'src/app/service/api-utente.service';

@Component({
	selector: 'app-sicurezza',
	templateUrl: './sicurezza.component.html',
	styleUrls: ['./sicurezza.component.scss'],
})
export class SicurezzaComponent implements OnDestroy {
	private distruggi$: Subject<void> = new Subject<void>();
	protected giorniScad: string = '';
	protected ctrlPswScad!: boolean;

	dataPsw: Psw | null = null;
	dataPswScad: Config | null = null;

	constructor(private apiUtente: ApiUtenteService, private apiPublic: ApiPublicService) {
		this.apiUtente
			.getPsw()
			.pipe(
				takeUntil(this.distruggi$),
				take(1),
				switchMap((psw: Psw) =>
					this.apiPublic.getPswScad().pipe(
						takeUntil(this.distruggi$),
						take(1),
						map((config: Config) => ({ psw, config })),
					),
				),
			)
			.subscribe(({ psw, config }) => {
				this.dataPsw = psw;
				this.dataPswScad = config;
				this.ctrlScadPsw(config, psw);
			});
	}

	ngOnDestroy(): void {
		this.distruggi$.next();
		this.distruggi$.complete();
	}

	protected ctrlScadPsw(pswConfig: Config, psw: Psw): void {
		const maxScadenza: number = parseInt(pswConfig.valore);
		const creazione: Date | undefined = psw.created_at;
		if (creazione && maxScadenza) {
			const scadenza: Date = new Date(creazione);
			scadenza.setSeconds(scadenza.getSeconds() + maxScadenza);
			if (Date.now() >= scadenza.getTime()) {
				this.ctrlPswScad = false;
				this.giorniScad = '0';
			} else {
				this.ctrlPswScad = true;
				// Calcolo dei giorni mancanti alla scadenza
				const millisecondiMancanti = scadenza.getTime() - Date.now();
				const giorniMancanti = Math.ceil(millisecondiMancanti / (1000 * 60 * 60 * 24));
				this.giorniScad = giorniMancanti.toString();
			}
		}
	}
}
