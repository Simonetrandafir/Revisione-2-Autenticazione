import { Component, OnDestroy } from '@angular/core';
import { Subscription, exhaustMap, of } from 'rxjs';
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
	protected giorniScad: string = '';
	protected ctrlPswScad!: boolean;
	constructor(private apiUtente: ApiUtenteService, private apiPublic: ApiPublicService) {
		this.subPsw = this.apiUtente
			.getPsw()
			.pipe(
				exhaustMap((x: Psw) => {
					this.subPswScad = this.apiPublic.getPswScad().subscribe((data: Config) => {
						this.dataPswScad = data;
						this.ctrlScadPsw(data, x);
					});
					return of(x);
				}),
			)
			.subscribe((data: Psw) => {
				this.dataPsw = data;
			});
	}
	ngOnDestroy(): void {
		this.subPsw.unsubscribe();
		this.subPswScad.unsubscribe();
	}

	dataPsw: Psw | null = null;
	subPsw!: Subscription;

	dataPswScad: Config | null = null;
	subPswScad!: Subscription;

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
