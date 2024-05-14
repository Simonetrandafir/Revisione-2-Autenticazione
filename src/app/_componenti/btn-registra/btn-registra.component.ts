import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { ComuniItaliani } from 'src/app/interface/comuni.interface';
import { Nazioni } from 'src/app/interface/nazioni.interface';
import { Province } from 'src/app/interface/province.interface';
import { RispostaServer } from 'src/app/interface/risposta-server';
import { ApiPublicService } from 'src/app/service/api-public.service';

import { MsgUtenteService } from 'src/app/service/msg-utente.service';
import { MsgUtenteT } from 'src/app/type/msgUtente.type';

@Component({
	selector: 'app-btn-registra',
	templateUrl: './btn-registra.component.html',
	styleUrls: ['./btn-registra.component.scss'],
})
export class BtnRegistraComponent implements OnDestroy, OnInit {
	private distruggi$ = new Subject<void>();
	//?----------------------------------------------------------Switch accedi->registra------------------------------------------------------
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
			provinciaNascita: ['', [Validators.required]],
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
		this.$elencoNazioni = this.api.getHttpNazioni();
		this.$comuni = this.api.getHttpComuni();
		this.$province = this.api.getHttpProvince();
	}

	ngOnInit(): void {
		this.nazioniView();
		this.comuniView();
		this.provinceView();
	}
	ngOnDestroy(): void {
		this.distruggi$.next();
	}

	//------------------------------------------- SETTING MODAL ------------------------
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
				// let username = this.reactiveForm.controls['usernameLog'].value;
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

	//?--------------------------------- CHIAMATA API PER CAMPI SELECT -----------------------------------------------------
	nazioniArr!: Nazioni[];
	$elencoNazioni: Observable<RispostaServer>;
	protected nazioniView() {
		return this.$elencoNazioni
			.pipe(
				map((risposta: RispostaServer) => {
					if (risposta && risposta.data) {
						const arrayDiOggetti: {}[] = risposta.data.flat();
						// Trasforma l'array di oggetti in un array di oggetti di tipo Nazioni
						const arrayDiNazioni: Nazioni[] = arrayDiOggetti.map((oggetto: any) => {
							// Effettua la trasformazione degli oggetti in oggetti di tipo Nazioni
							const nazione: Nazioni = {
								idNazione: oggetto.ID,
								nome: oggetto.Nome,
								continente: oggetto.Continente,
								iso: oggetto.iso,
								iso3: oggetto.iso3,
								prefissoTel: oggetto.Prefisso,
							};
							return nazione;
						});
						return arrayDiNazioni;
					} else {
						console.error('errore');
						return [];
					}
				}),
				takeUntil(this.distruggi$),
			)
			.subscribe({
				next: (arrayDiNazioni: Nazioni[]) => {
					// Puoi fare ulteriori operazioni qui con l'array di Nazioni
					if (this.nazioniArr !== undefined || this.nazioniArr !== null) {
						this.nazioniArr = arrayDiNazioni;
					} else {
						this.distruggi$.next();
					}
				},
			});
	}
	//-----------------------------------------------------------------------
	comuniArr!: ComuniItaliani[];
	$comuni: Observable<RispostaServer>;
	protected comuniView() {
		return this.$comuni
			.pipe(
				map((risposta: RispostaServer) => {
					if (risposta && risposta.data) {
						const arrayDiOggetti: {}[] = risposta.data.flat();

						const arrayComuni: ComuniItaliani[] = arrayDiOggetti.map((oggetto: any) => {
							const comuni: ComuniItaliani = {
								idComuneItalia: oggetto.idComuneItalia,
								nome: oggetto.nome,
								regione: oggetto.regione,
								metropolitana: oggetto.metropolitana,
								provincia: oggetto.provincia,
								siglaAuto: oggetto.siglaAuto,
								codCatastale: oggetto.codCatastale,
								capoluogo: oggetto.capoluogo,
								multiCap: oggetto.multiCap,
								cap: oggetto.cap,
								capInizio: oggetto.capInizio,
								capFine: oggetto.capFine,
							};
							return comuni;
						});
						return arrayComuni;
					} else {
						console.error('errore');
						return [];
					}
				}),
				takeUntil(this.distruggi$),
			)
			.subscribe({
				next: (arrayComuni: ComuniItaliani[]) => {
					if (this.comuniArr !== undefined || this.comuniArr !== null) {
						this.comuniArr = arrayComuni;
					} else {
						this.distruggi$.next();
					}
				},
			});
	}
	//-----------------------------------------------------------------------
	provinceArr!: Province[];
	$province: Observable<RispostaServer>;
	protected provinceView() {
		return this.$province
			.pipe(
				map((risposta: RispostaServer) => {
					if (risposta && risposta.data) {
						const arrayDiOggetti: {}[] = risposta.data.flat();

						const arrayProvince: Province[] = arrayDiOggetti.map((oggetto: any) => {
							const provincia: Province = {
								provincia: oggetto.provincia,
							};
							return provincia;
						});
						return arrayProvince;
					} else {
						console.error('errore');
						return [];
					}
				}),
				takeUntil(this.distruggi$),
			)
			.subscribe({
				next: (arrayProvince: Province[]) => {
					if (this.provinceArr !== undefined || this.provinceArr !== null) {
						this.provinceArr = arrayProvince;
					} else {
						this.distruggi$.next();
					}
				},
			});
	}
}
