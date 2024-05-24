import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-profilo',
	templateUrl: './profilo.component.html',
	styleUrls: ['./profilo.component.scss'],
})
export class ProfiloComponent implements AfterViewInit, OnDestroy {
	auth$: BehaviorSubject<AuthType>;

	constructor(private ObsTokenJwt: ObsTokenJwt, private router: Router) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
	}

	ngOnDestroy(): void {}

	ngAfterViewInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				window.location.reload();
			}
		});
	}
}
