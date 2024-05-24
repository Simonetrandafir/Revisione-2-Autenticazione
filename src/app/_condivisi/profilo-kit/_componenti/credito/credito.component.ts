import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Credito } from 'src/app/interface/utente/credito.interface';
import { ApiUtenteService } from 'src/app/service/api-utente.service';

@Component({
	selector: 'app-credito',
	templateUrl: './credito.component.html',
	styleUrls: ['./credito.component.scss'],
})
export class CreditoComponent implements OnDestroy {
	constructor(private apiUtente: ApiUtenteService) {
		this.subCredito = this.apiUtente.getCredito().subscribe((data: Credito) => {
			this.dataCredito = data;
		});
	}
	ngOnDestroy(): void {
		this.subCredito.unsubscribe();
	}

	dataCredito: Credito | null = null;
	subCredito!: Subscription;
}
