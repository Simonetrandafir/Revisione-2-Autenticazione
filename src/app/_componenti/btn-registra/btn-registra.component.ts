import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, OperatorFunction, Subject, Subscription, debounceTime, map, takeUntil } from 'rxjs';
import { ComuniItaliani } from 'src/app/interface/comuni.interface';
import { Nazioni } from 'src/app/interface/nazioni.interface';
import { Province } from 'src/app/interface/province.interface';
import { ApiPublicService } from 'src/app/service/api-public.service';

import { MsgUtenteService } from 'src/app/service/msg-utente.service';
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

	//?--------------------------------------------------------CONTROLLO FORM--------------------------------------------------------------------

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
		private api: ApiPublicService,
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

		//?---------------------------------------------- API PUBLIC ------------------------------------
		this.api
			.getNazioni()
			.pipe(takeUntil(this.distruggi$))
			.subscribe((data: Nazioni[]) => {
				this.dataNazioni = data;
			});
		this.api
			.getProvince()
			.pipe(takeUntil(this.distruggi$))
			.subscribe((data: Province[]) => {
				this.dataProvince = data;
			});
		this.api
			.getComuni()
			.pipe(takeUntil(this.distruggi$))
			.subscribe((data: ComuniItaliani[]) => {
				this.dataComuni = data;
			});
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
				throw new Error('Registrazione fallita');
			} else {
				let test = this.reactiveForm.controls['citta'].value;
				console.log(test.id);
				// let email = this.reactiveForm.controls['emailLog'].value;
				// let psw = this.reactiveForm.controls['pswLog'].value;
				// let ricordaAccesso = this.reactiveForm.controls['ricordaAccesso'].value;
				// this.ctrlDati = ricordaAccesso;
				// this.ctrlForm = true;
				// this.ctrlUtente = true;
				// this.obsLogin(username, email, psw).subscribe(this.osservaLogin());
			}
		} catch (error) {
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
