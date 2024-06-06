import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, OperatorFunction, Subject, Subscription, debounceTime, map, takeUntil } from 'rxjs';
import { ComuniItaliani } from 'src/app/interface/comuni.interface';
import { Nazioni } from 'src/app/interface/nazioni.interface';
import { Province } from 'src/app/interface/province.interface';
import { RegistraDati } from 'src/app/interface/registra.interface';
import { RispostaServer } from 'src/app/interface/risposta-server';
import { ApiPublicService } from 'src/app/service/api-public.service';
import { ApiRegistraService } from 'src/app/service/api-registra.service';

import { MsgUtenteService } from 'src/app/service/msg-utente.service';
import { UtilityService } from 'src/app/service/utility.service';
import { MsgUtenteT } from 'src/app/type/msgUtente.type';

@Component({
	selector: 'app-btn-registra',
	templateUrl: './btn-registra.component.html',
	styleUrls: ['./btn-registra.component.scss'],
})
export class BtnRegistraComponent implements OnDestroy {
	private distruggi$: Subject<void> = new Subject<void>();
	//*----------------------------------------------------------Switch accedi->registra------------------------------------------------------
	private switchModal: boolean = false;
	@Input()
	set riceviSwitch(value: any) {
		this.switchModal = value;
		if (this.switchModal === true) {
			this.apriModal(this.registraModel);
			this.switchModal = false;
		}
	}
	@ViewChild('registraModel') registraModel: any;
	@Output() switchModelReturn: EventEmitter<any> = new EventEmitter<any>();
	inviaSwitch(dati: any) {
		this.switchModelReturn.emit(dati);
	}

	//?--------------------------------------------------------CONTROLLO FORM-------------------------------------------------------------------
	// controllo form per ritorno visivo utente
	protected ctrlDati: boolean = false;
	protected ctrlForm: boolean = false;
	protected ctrlUtente: boolean = false;
	// validazione input
	protected reactiveForm: FormGroup;

	// Osservatore messaggio di ritorno per l'utente
	msg$: BehaviorSubject<MsgUtenteT>;

	//?--------------------------- CONSTRUCTOR ---------------------------------------------
	constructor(
		private modalService: NgbModal,
		private config: NgbModalConfig,
		private msgService: MsgUtenteService,
		private formBuild: FormBuilder,
		private apiPublic: ApiPublicService,
		private apiRegistra: ApiRegistraService,
	) {
		// ng-bootstrap config
		config.backdrop = 'static';
		config.keyboard = false;
		// Validazione campi
		this.reactiveForm = this.formBuild.group({
			nome: ['', [Validators.required]],
			cognome: ['', [Validators.required]],
			sesso: ['', [Validators.required]],
			dataNascita: ['', [Validators.required]],
			nazione: ['', [Validators.required]],
			citta: ['', [Validators.required]],
			provincia: ['', [Validators.required]],
			indirizzo: ['', [Validators.required]],
			civico: ['', [Validators.required]],
			cittadinanza: ['', [Validators.required]],
			codFiscale: ['', [Validators.required]],
			username: ['', [Validators.required]],
			email: ['', [Validators.required]],
			psw: ['', [Validators.required]],
			pswCheck: ['', [Validators.required]],
			preferito: ['', [Validators.required]],
			checkDati: ['', [Validators.required]],
		});
		// leggi osservatori
		this.msg$ = this.msgService.leggiObsMsg();

		//?---------------------------------------------- API ------------------------------------
		this.getDatiApi();
	}

	//?--------------------------------- DESTROY -----------------------------------------
	ngOnDestroy(): void {
		this.distruggi$.next();
		this.distruggi$.complete();
	}

	//*------------------------------------------- SETTING MODAL ------------------------
	apriModal(recModal: any) {
		this.modalService.open(recModal, { scrollable: true, centered: true });
	}
	chiudiModal() {
		this.modalService.dismissAll();
	}
	showHidePsw() {
		const pswInput: HTMLInputElement = document.getElementById('psw') as HTMLInputElement;
		if (pswInput.type === 'password') {
			pswInput.type = 'text';
		} else {
			pswInput.type = 'password';
		}
	}
	showHidePswCheck() {
		const pswInput: HTMLInputElement = document.getElementById('pswCheck') as HTMLInputElement;
		if (pswInput.type === 'password') {
			pswInput.type = 'text';
		} else {
			pswInput.type = 'password';
		}
	}

	//!------------------------------------------- REGISTRA ---------------------------------------------------------
	registra() {
		try {
			if (this.reactiveForm.invalid) {
				const nome: string = this.reactiveForm.controls['nome'].value;
				const cognome: string = this.reactiveForm.controls['cognome'].value;
				const sesso: string = this.reactiveForm.controls['sesso'].value;
				const dataNascita: Date = this.reactiveForm.controls['dataNascita'].value;
				const nazione: { id: number; name: string } = this.reactiveForm.controls['nazione'].value;
				const citta: { id: number; name: string } = this.reactiveForm.controls['citta'].value;
				const provincia: { id: number; name: string } = this.reactiveForm.controls['provincia'].value;
				const indirizzo: string = this.reactiveForm.controls['indirizzo'].value;
				const civico: string = this.reactiveForm.controls['civico'].value;
				const cittadinanza: string = this.reactiveForm.controls['cittadinanza'].value;
				const codFiscale: string = this.reactiveForm.controls['codFiscale'].value;
				const username: string = this.reactiveForm.controls['username'].value;
				const email: string = this.reactiveForm.controls['email'].value;
				const psw: string = this.reactiveForm.controls['psw'].value;
				const preferito: string = this.reactiveForm.controls['preferito'].value;
				const checkDati: boolean = this.reactiveForm.controls['checkDati'].value;
				const newUtente: RegistraDati = {
					nome: nome,
					cognome: cognome,
					sesso: sesso,
					dataNascita: dataNascita,
					nazione: nazione.id,
					citta: citta.id,
					provincia: provincia.name,
					indirizzo: indirizzo,
					civico: civico,
					cittadinanza: cittadinanza,
					codFiscale: codFiscale,
					username: username,
					email: email,
					psw: psw,
					preferito: preferito,
					checkDati: checkDati,
				};
				console.log(newUtente);
				throw new Error('Form invalid');
			} else {
				const nome: string = this.reactiveForm.controls['nome'].value;
				const cognome: string = this.reactiveForm.controls['cognome'].value;
				const sesso: string = this.reactiveForm.controls['sesso'].value;
				const dataNascita: Date = this.reactiveForm.controls['dataNascita'].value;
				const nazione: { id: number; name: string } = this.reactiveForm.controls['nazione'].value;
				const citta: { id: number; name: string } = this.reactiveForm.controls['citta'].value;
				const provincia: { id: number; name: string } = this.reactiveForm.controls['provincia'].value;
				const indirizzo: string = this.reactiveForm.controls['indirizzo'].value;
				const civico: string = this.reactiveForm.controls['civico'].value;
				const cittadinanza: string = this.reactiveForm.controls['cittadinanza'].value;
				const codFiscale: string = this.reactiveForm.controls['codFiscale'].value;
				const username: string = this.reactiveForm.controls['username'].value;
				const email: string = this.reactiveForm.controls['email'].value;
				const psw: string = this.reactiveForm.controls['psw'].value;
				const preferito: string = this.reactiveForm.controls['preferito'].value;
				const checkDati: boolean = this.reactiveForm.controls['checkDati'].value;
				const newUtente: RegistraDati = {
					nome: nome,
					cognome: cognome,
					sesso: sesso,
					dataNascita: dataNascita,
					nazione: nazione.id,
					citta: citta.id,
					provincia: provincia.name,
					indirizzo: indirizzo,
					civico: civico,
					cittadinanza: cittadinanza,
					codFiscale: codFiscale,
					username: username,
					email: email,
					psw: psw,
					preferito: preferito,
					checkDati: checkDati,
				};
				this.apiRegistra.sendRegistra(newUtente).subscribe((x: RispostaServer) => {
					if (x.error !== null && x.data === null && x.message !== null) {
						throw new Error(x.message);
					} else {
						const msgUtente: MsgUtenteT = {
							mostra: true,
							type: 'success',
							msg: "Registrazione riuscita, effettua l'accesso e goderti i tuoi 100 crediti omaggio",
						};
						this.msgService.setObsMsg(msgUtente);
						this.msgService.autoClose(5000);
					}
				});
			}
		} catch (error) {
			console.error(error);
			const msgUtente: MsgUtenteT = {
				mostra: true,
				type: 'error',
				msg: 'Registrazione fallita, ti preghiamo di ricontrollare i data inseriti.',
			};
			this.msgService.setObsMsg(msgUtente);
			this.msgService.autoClose(5000);
		}
	}

	//?--------------------------------- DATI API PER CAMPI SELECT -----------------------------------------------------
	private getDatiApi(): void {
		if (UtilityService.isLocalStorageKey('nazioni')) {
			this.dataNazioni = UtilityService.getLocalStorageObj('nazioni');
		} else {
			this.apiPublic
				.getNazioni()
				.pipe(takeUntil(this.distruggi$))
				.subscribe((data: Nazioni[]) => {
					UtilityService.setNazioniLocalStorage(data);
					this.dataNazioni = data;
				});
		}
		if (UtilityService.isLocalStorageKey('provinceItalia')) {
			this.dataProvince = UtilityService.getLocalStorageObj('provinceItalia');
		} else {
			this.apiPublic
				.getProvince()
				.pipe(takeUntil(this.distruggi$))
				.subscribe((data: Province[]) => {
					UtilityService.setProvinceLocalStorage(data);
					this.dataProvince = data;
				});
		}
		if (UtilityService.isLocalStorageKey('comuniItalia')) {
			this.dataComuni = UtilityService.getLocalStorageObj('comuniItalia');
		} else {
			this.apiPublic
				.getComuni()
				.pipe(takeUntil(this.distruggi$))
				.subscribe((data: ComuniItaliani[]) => {
					UtilityService.setComuniLocalStorage(data);
					this.dataComuni = data;
				});
		}
	}
	//---------------------------------- NAZIONI -------------------------------------
	dataNazioni!: Nazioni[];
	protected cercaNazione: OperatorFunction<string, readonly { id: number; name: string }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			map((term) => {
				if (term === '') {
					return [];
				} else {
					return this.dataNazioni
						.filter((v) => v.nome.toLowerCase().indexOf(term.toLowerCase()) > -1)
						.map((nazione) => ({ id: nazione.idNazione, name: nazione.nome }))
						.slice(0, 10);
				}
			}),
		);

	nazione = (x: { id: number; name: string }) => x.name;

	//------------------------------- PROVINCE ----------------------------------------
	dataProvince!: Province[];
	protected cercaProvincia: OperatorFunction<string, readonly { name: string }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			map((term) => {
				if (term === '') {
					return [];
				} else {
					return this.dataProvince
						.filter((v) => v.provincia.toLowerCase().indexOf(term.toLowerCase()) > -1)
						.map((data) => ({ name: data.provincia }))
						.slice(0, 10);
				}
			}),
		);

	provincia = (x: { name: string }) => x.name;
	//------------------------------------- COMUNI ----------------------------------
	dataComuni!: ComuniItaliani[];
	protected cercaComune: OperatorFunction<string, readonly { id: number; name: string }[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			map((term) => {
				if (term === '') {
					return [];
				} else {
					return this.dataComuni
						.filter((v) => v.nome.toLowerCase().indexOf(term.toLowerCase()) > -1)
						.map((comune) => ({ id: comune.idComuneItalia, name: comune.nome }))
						.slice(0, 10);
				}
			}),
		);

	comune = (x: { id: number; name: string }) => x.name;
}
