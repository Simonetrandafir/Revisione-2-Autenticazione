import { AfterViewInit, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements AfterViewInit {
	auth$: BehaviorSubject<AuthType>;

	constructor(private ObsTokenJwt: ObsTokenJwt) {
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
