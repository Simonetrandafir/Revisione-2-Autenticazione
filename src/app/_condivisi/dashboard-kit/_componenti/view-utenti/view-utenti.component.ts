import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map, startWith, take } from 'rxjs';
import { Contatto } from 'src/app/interface/utente/contatto.interface';
import { Utente } from 'src/app/interface/utente/utente.interface';
import { ApiAdminService } from 'src/app/service/api-admin.service';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-view-utenti',
	templateUrl: './view-utenti.component.html',
	styleUrls: ['./view-utenti.component.scss'],
})
export class ViewUtentiComponent implements OnInit {
	auth$: BehaviorSubject<AuthType>;
	protected dataUtenti: Utente[] = [];
	protected utenti$!: Observable<Utente[]>;

	filter = new FormControl('', { nonNullable: true });
	page = 1;
	pageSize = 10;
	collectionSize!: number;

	constructor(private obsTokenJwt: ObsTokenJwt, private apiAdmin: ApiAdminService) {
		this.auth$ = this.obsTokenJwt.leggiObsAutorizza();
		this.apiAdmin
			.getIndexUtenti()
			.pipe(take(1))
			.subscribe((data: Utente[]) => {
				this.dataUtenti = data;
				this.collectionSize = data.length;
				this.utenti$ = combineLatest([this.filter.valueChanges.pipe(startWith('')), new BehaviorSubject<number>(this.page)]).pipe(
					map(([filterText, page]) => this.search(filterText, page)),
				);
			});
	}

	ngOnInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				window.location.reload();
			}
		});
	}

	search(text: string, page: number): Utente[] {
		const utentiFiltrati = this.dataUtenti.filter((utente) => {
			const term = text.toLowerCase();
			return utente.nome.toLowerCase().includes(term);
		});

		return utentiFiltrati.slice((page - 1) * this.pageSize, (page - 1) * this.pageSize + this.pageSize);
	}

	refreshCountries() {
		this.utenti$ = combineLatest([this.filter.valueChanges.pipe(startWith('')), new BehaviorSubject<number>(this.page)]).pipe(
			map(([filterText, page]) => this.search(filterText, page)),
		);
	}
}
