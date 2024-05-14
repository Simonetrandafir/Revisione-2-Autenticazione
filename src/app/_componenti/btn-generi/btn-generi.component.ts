import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Generi } from 'src/app/interface/generi.interface';
import { RispostaServer } from 'src/app/interface/risposta-server';
import { ApiGeneriService } from 'src/app/service/api-generi.service';

@Component({
	selector: 'app-btn-generi',
	templateUrl: './btn-generi.component.html',
	styleUrls: ['./btn-generi.component.scss'],
})
export class BtnGeneriComponent implements OnDestroy, OnInit {
	generi: Generi[] = [];
	obsGeneri$: Observable<RispostaServer>;
	private distruggi$ = new Subject<void>();

	constructor(private apiGeneri: ApiGeneriService) {
		this.obsGeneri$ = apiGeneri.getGeneri();
	}
	ngOnDestroy(): void {
		this.distruggi$.next();
		this.distruggi$.complete();
		this.apiGeneri.ngOnDestroy();
	}
	ngOnInit(): void {
		this.obsGeneri$.pipe(takeUntil(this.distruggi$)).subscribe(this.osservoCategory());
	}

	//------------------------------ OBSERVER ----------------------------------------
	private osservoCategory() {
		return {
			next: (x: RispostaServer) => {
				// console.log('NEXT', x);
				const elementi = x.data;
				for (const elemento of elementi) {
					const genere: Generi = {
						idGenere: elemento.idGenere,
						nome: elemento.nome,
						sku: elemento.sku,
						visualizzato: elemento.visualizzato,
					};
					this.generi.push(genere);
				}
			},
			error: (errore: any) => {
				console.error(' ERRORE', errore);
			},
			complete: () => {},
		};
	}
}
