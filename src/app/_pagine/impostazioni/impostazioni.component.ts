import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-impostazioni',
	templateUrl: './impostazioni.component.html',
	styleUrls: ['./impostazioni.component.scss'],
})
export class ImpostazioniComponent implements AfterViewInit {
	auth$: BehaviorSubject<AuthType>;

	constructor(private ObsTokenJwt: ObsTokenJwt, private router: Router) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
	}
	ngAfterViewInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				window.location.reload();
			}
		});
	}
}
