import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	private auth$: BehaviorSubject<AuthType>;
	private dataAuth: AuthType;
	constructor(private token: ObsTokenJwt, private router: Router) {
		this.auth$ = this.token.leggiObsAutorizza();
		this.dataAuth = this.auth$.getValue();
	}
	ngOnInit(): void {
		const token = this.dataAuth.token;
		const idRuolo = this.dataAuth.idRuolo;
		if (token === null) {
			window.location.reload();
		} else if (idRuolo !== 1) {
			this.router.navigate(['/home']);
		}
	}
}
