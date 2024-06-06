import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, map, startWith, take } from 'rxjs';
import { ComuniItaliani } from 'src/app/interface/comuni.interface';
import { Nazioni } from 'src/app/interface/nazioni.interface';
import { Indirizzo } from 'src/app/interface/utente/indirizzo.interface';
import { ApiAdminService } from 'src/app/service/api-admin.service';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-view-indirizzi',
	templateUrl: './view-indirizzi.component.html',
	styleUrls: ['./view-indirizzi.component.scss'],
})
export class ViewIndirizziComponent {
	auth$: BehaviorSubject<AuthType>;
	protected data: Indirizzo[] = [];
	protected indirizzi$!: Observable<Indirizzo[]>;

	filter = new FormControl('', { nonNullable: true });
	page = 1;
	pageSize = 5;
	collectionSize!: number;

	constructor(private obsTokenJwt: ObsTokenJwt, private apiAdmin: ApiAdminService) {
		this.auth$ = this.obsTokenJwt.leggiObsAutorizza();
		this.apiAdmin
			.getIndexIndirizzi()
			.pipe(take(1))
			.subscribe((data: Indirizzo[]) => {
				this.data = data;
				console.log(this.data);
				this.collectionSize = data.length;
				this.indirizzi$ = combineLatest([this.filter.valueChanges.pipe(startWith('')), new BehaviorSubject<number>(this.page)]).pipe(
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

	search(text: string, page: number): Indirizzo[] {
		const utentiFiltrati = this.data.filter((indirizzo) => {
			const term = text.toLowerCase();
			return indirizzo.idContatto.toString().includes(term);
		});

		return utentiFiltrati.slice((page - 1) * this.pageSize, (page - 1) * this.pageSize + this.pageSize);
	}

	refreshCountries() {
		this.indirizzi$ = combineLatest([this.filter.valueChanges.pipe(startWith('')), new BehaviorSubject<number>(this.page)]).pipe(
			map(([filterText, page]) => this.search(filterText, page)),
		);
	}
}
