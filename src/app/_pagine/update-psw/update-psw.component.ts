import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { NewPsw } from 'src/app/interface/utente/newPsw.interface';
import { ApiUtenteService } from 'src/app/service/api-utente.service';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { UtilityService } from 'src/app/service/utility.service';
import { AuthType } from 'src/app/type/auth.type';

@Component({
	selector: 'app-update-psw',
	templateUrl: './update-psw.component.html',
	styleUrls: ['./update-psw.component.scss'],
})
export class UpdatePswComponent {
	protected cambiaPswForm: FormGroup;
	protected forzaPsw: number = 0;
	protected validPsw: boolean = false;
	protected timeCrack: string = '0 secondi';
	protected auth$: BehaviorSubject<AuthType>;
	protected dataAuth: AuthType;

	constructor(
		private ObsTokenJwt: ObsTokenJwt,
		private utility: UtilityService,
		private formBuild: FormBuilder,
		private config: NgbProgressbarConfig,
		private apiUtente: ApiUtenteService,
	) {
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
		this.dataAuth = this.auth$.getValue();

		this.cambiaPswForm = this.formBuild.group({
			newPsw: ['', [Validators.required]],
			ctrlNewPsw: ['', [Validators.required]],
			conferma: ['', [Validators.required]],
		});
		config.max = 100;
		config.animated = true;
		config.striped = true;
		config.height = '15px';
		config.showValue = true;
	}

	ngAfterViewInit(): void {
		this.auth$.subscribe((auth: AuthType) => {
			if (auth.token === null) {
				window.location.reload();
			}
		});
	}

	showHidePsw(idElement: string) {
		UtilityService.showHidePsw(idElement);
	}

	controlloForza(inputPsw: HTMLInputElement) {
		const pswValue = inputPsw.value;
		const { percentuale, validita } = UtilityService.checkPswForza(pswValue);
		this.forzaPsw = percentuale;
		this.validPsw = validita;

		this.timeCrack = UtilityService.calculateCrackTime(pswValue);
	}

	cambiaPsw() {
		if (this.dataAuth.idUtente !== null && !this.cambiaPswForm.invalid) {
			console.log('CAMBIAA');
			const idContatto = this.dataAuth.idUtente;
			const psw = this.cambiaPswForm.controls['newPsw'].value;
			const newPsw: NewPsw = {
				idContatto: idContatto,
				psw: psw,
				sale: '',
			};
			this.apiUtente.setNewPsw(newPsw);
		}
	}
}
