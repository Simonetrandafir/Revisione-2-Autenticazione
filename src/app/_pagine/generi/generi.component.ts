import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Generi } from 'src/app/interface/generi.interface';
import { ApiGeneriService } from 'src/app/service/api-generi.service';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-generi',
	templateUrl: './generi.component.html',
	styleUrls: ['./generi.component.scss'],
})
export class GeneriComponent implements AfterViewInit, OnDestroy {
	auth$: BehaviorSubject<AuthType>;
	dataGeneri: Generi[] = [];
	distruggi$: Subject<void> = new Subject<void>();
	pagina: string = 'generi';

	constructor(private ObsTokenJwt: ObsTokenJwt, private router: Router, private apiGeneri: ApiGeneriService) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
		this.apiGeneri
			.getGeneri()
			.pipe(takeUntil(this.distruggi$))
			.subscribe((data: Generi[]) => {
				const elementi = data;
				for (const elemento of elementi) {
					const genere: Generi = {
						idGenere: elemento.idGenere,
						nome: elemento.nome,
						sku: elemento.sku,
						visualizzato: elemento.visualizzato,
					};
					this.dataGeneri.push(genere);
				}
			});
	}
	ngOnDestroy(): void {
		this.distruggi$.next();
		this.distruggi$.complete();
	}
	ngAfterViewInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				window.location.reload();
			}
		});
	}
}
