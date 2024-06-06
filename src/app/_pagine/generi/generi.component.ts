import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, take, takeUntil, tap } from 'rxjs';
import { Generi } from 'src/app/interface/generi.interface';
import { ApiGeneriService } from 'src/app/service/api-generi.service';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-generi',
	templateUrl: './generi.component.html',
	styleUrls: ['./generi.component.scss'],
})
export class GeneriComponent implements OnInit, OnDestroy {
	private auth$: BehaviorSubject<AuthType>;
	dataGeneri: Generi[] = [];

	pagina: string = 'generi';

	constructor(private ObsTokenJwt: ObsTokenJwt, private router: Router, private apiGeneri: ApiGeneriService) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				window.location.reload();
			}
		});
	}
	ngOnInit(): void {
		this.apiGeneri
			.getGeneri()
			.pipe(
				take(1),
				tap((x: Generi[]) => console.log(x)),
			)
			.subscribe((data: Generi[]) => {
				const elementi = data;
				for (const elemento of elementi) {
					const genere: Generi = {
						idGenere: elemento.idGenere,
						nome: elemento.nome,
						sku: elemento.sku,
					};
					this.dataGeneri.push(genere);
				}
			});
	}
	ngOnDestroy(): void {}
}
