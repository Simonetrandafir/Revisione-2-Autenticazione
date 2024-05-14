import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	auth$: BehaviorSubject<AuthType>;

	constructor(private tokenService: ObsTokenJwt) {
		this.auth$ = this.tokenService.leggiObsAutorizza();
	}
}
