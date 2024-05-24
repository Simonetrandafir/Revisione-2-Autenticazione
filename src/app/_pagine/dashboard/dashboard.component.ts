import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map, startWith } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

interface Country {
	id?: number;
	name: string;
	flag: string;
	area: number;
	population: number;
}

const COUNTRIES: Country[] = [
	{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'Francia',
		flag: 'c/c3/Flag_of_France.svg',
		area: 640679,
		population: 64979548,
	},
	{
		name: 'Germania',
		flag: 'b/ba/Flag_of_Germany.svg',
		area: 357114,
		population: 82114224,
	},
	{
		name: 'Portogallo',
		flag: '5/5c/Flag_of_Portugal.svg',
		area: 92090,
		population: 10329506,
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199,
	},
	{
		name: 'Vietnam',
		flag: '2/21/Flag_of_Vietnam.svg',
		area: 331212,
		population: 95540800,
	},
	{
		name: 'Brasile',
		flag: '0/05/Flag_of_Brazil.svg',
		area: 8515767,
		population: 209288278,
	},
	{
		name: 'Messico',
		flag: 'f/fc/Flag_of_Mexico.svg',
		area: 1964375,
		population: 129163276,
	},
	{
		name: 'Stati Uniti',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: 9629091,
		population: 324459463,
	},
	{
		name: 'India',
		flag: '4/41/Flag_of_India.svg',
		area: 3287263,
		population: 1324171354,
	},
	{
		name: 'Indonesia',
		flag: '9/9f/Flag_of_Indonesia.svg',
		area: 1910931,
		population: 263991379,
	},
	{
		name: 'Tuvalu',
		flag: '3/38/Flag_of_Tuvalu.svg',
		area: 26,
		population: 11097,
	},
	{
		name: 'Cina',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: 9596960,
		population: 1409517397,
	},
];

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
	auth$: BehaviorSubject<AuthType>;
	countries$: Observable<Country[]>;
	filter = new FormControl('', { nonNullable: true });
	page = 1;
	pageSize = 4;
	collectionSize = COUNTRIES.length;

	constructor(private obsTokenJwt: ObsTokenJwt, private router: Router) {
		this.auth$ = this.obsTokenJwt.leggiObsAutorizza();
		this.countries$ = combineLatest([this.filter.valueChanges.pipe(startWith('')), new BehaviorSubject<number>(this.page)]).pipe(
			map(([filterText, page]) => this.search(filterText, page)),
		);
	}

	ngAfterViewInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				window.location.reload();
			}
		});
	}

	search(text: string, page: number): Country[] {
		const filteredCountries = COUNTRIES.filter((country) => {
			const term = text.toLowerCase();
			return country.name.toLowerCase().includes(term);
		});

		return filteredCountries.slice((page - 1) * this.pageSize, (page - 1) * this.pageSize + this.pageSize);
	}

	refreshCountries() {
		this.countries$ = combineLatest([this.filter.valueChanges.pipe(startWith('')), new BehaviorSubject<number>(this.page)]).pipe(
			map(([filterText, page]) => this.search(filterText, page)),
		);
	}
}
