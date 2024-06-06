import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-profilo',
	templateUrl: './profilo.component.html',
	styleUrls: ['./profilo.component.scss'],
})
export class ProfiloComponent implements OnInit {
	private auth$: BehaviorSubject<AuthType>;
	private dataAuth: AuthType;

	constructor(private ObsTokenJwt: ObsTokenJwt) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
		this.dataAuth = this.auth$.getValue();
	}

	ngOnInit(): void {
		const token = this.dataAuth.token;
		if (token === null) {
			window.location.reload();
		}
	}
}
