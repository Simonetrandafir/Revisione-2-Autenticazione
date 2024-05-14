import { Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Observer, Subject, catchError, delay, of, take, takeUntil } from 'rxjs';
import { RispostaServer } from 'src/app/interface/risposta-server';
import { ObsTokenJwt } from 'src/app/service/obs-token.service';
import { CtrlEmail, CtrlPsw, CtrlUsername } from 'src/app/service/accesso.validators';
import { ApiAccessoService } from 'src/app/service/api-accesso.service';
import { MsgUtenteService } from 'src/app/service/msg-utente.service';
import { UtilityService } from 'src/app/service/utility.service';
import { AuthType } from 'src/app/type/auth.type';
import { MsgUtenteT } from 'src/app/type/msgUtente.type';

@Component({
	selector: 'app-btn-accedi',
	templateUrl: './btn-accedi.component.html',
	styleUrls: ['./btn-accedi.component.scss'],
})
export class BtnAccediComponent implements OnDestroy {
	/**
	 * Componente per passare dal modal accedi al modal registrati
	 *
	 * @param EventEmitter
	 * @function inviaSwitch()
	 */
	@Output() switchModal: EventEmitter<any> = new EventEmitter<any>();
	/**
	 * Funzione che emette il valore dello switch Modal alla navbar
	 */
	inviaSwitch(data: any) {
		this.switchModal.emit(data);
	}

	@ViewChild('pswLogin') pswLogin!: ElementRef;

	// checkbox per localStorage setItem
	protected ricordami: boolean = false;
	// controllo form per ritorno visivo utente
	protected ctrlForm: boolean = false;
	protected ctrlUtente: boolean = false;
	// validazione input
	protected reactiveForm: FormGroup;

	// Osservatore messaggio di ritorno per l'utente
	msg$: BehaviorSubject<MsgUtenteT>;
	// Osservatore per il token di autenticazione
	auth$: BehaviorSubject<AuthType>;

	private distruggi$ = new Subject<void>();

	constructor(
		private api: ApiAccessoService,
		private ObsTokenJwt: ObsTokenJwt,
		private formBuild: FormBuilder,
		private router: Router,
		private elemento: ElementRef,
		private msgService: MsgUtenteService,
		private modalService: NgbModal,
		private config: NgbModalConfig,
	) {
		// ng-bootstrap config
		config.backdrop = 'static';
		config.keyboard = false;
		// Validazione campi
		this.reactiveForm = this.formBuild.group({
			usernameLog: ['', [CtrlUsername]],
			emailLog: ['', [CtrlEmail]],
			pswLog: ['', [CtrlPsw]],
			ricordaAccesso: [''],
		});
		// leggi osservatori
		this.msg$ = this.msgService.leggiObsMsg();
		this.auth$ = this.ObsTokenJwt.leggiObsAutorizza();
	}

	/**
	 * Distruggi osservatori al destroy
	 */
	ngOnDestroy(): void {
		this.distruggi$.next();
	}

	/**
	 * Comandi per aprire il modal di ng-bootstrap
	 *
	 * @requires NgbModal
	 * @param logModal
	 * @function apriModal()
	 */
	apriModal(logModal: any) {
		this.modalService.open(logModal, { scrollable: true, centered: true });
	}
	/**
	 * Comandi chiudere il modal di ng-bootstrap
	 *
	 * @requires NgbModal
	 * @function chiudiModal()
	 */
	chiudiModal() {
		this.modalService.dismissAll();
	}

	showHidePsw(): void {
		const pswInput: HTMLInputElement = document.getElementById('pswLog') as HTMLInputElement;
		if (pswInput.type === 'password') {
			pswInput.type = 'text';
		} else {
			pswInput.type = 'password';
		}
	}

	/**
	 * Funzione per la gestione dell'accesso con recupero di input se validi e chiamata observable del Login
	 *
	 * @requires reactiveForm.valid
	 * @param usernameLog
	 * @param emailLog
	 * @param pswLog
	 * @param ricordaAccesso
	 */
	accedi() {
		try {
			if (this.reactiveForm.invalid) {
				throw new Error('Accesso fallito');
			} else {
				let username = this.reactiveForm.controls['usernameLog'].value;
				let email = this.reactiveForm.controls['emailLog'].value;
				let psw = this.reactiveForm.controls['pswLog'].value;
				let ricordaAccesso = this.reactiveForm.controls['ricordaAccesso'].value;

				this.ricordami = ricordaAccesso;
				this.ctrlForm = true;
				this.ctrlUtente = true;

				this.obsLogin(username, email, psw).subscribe(this.osservaLogin());
			}
		} catch (error) {
			const msgUtente: MsgUtenteT = {
				mostra: true,
				type: 'error',
				msg: 'Accesso fallito, ti preghiamo di ricontrollare i data inseriti.',
			};
			this.msgService.setObsMsg(msgUtente);
			this.msgService.autoClose(5000);
		}
	}

	/**
	 * Funzione per il ritorno dell'osservazione del accesso con chiamata api al log in
	 *
	 * @requires ApiAccessoService
	 * @param username string
	 * @param email string
	 * @param psw string
	 * @returns Observable RispostaServer
	 */
	private obsLogin(username: string, email: string, psw: string): Observable<RispostaServer> {
		return this.api.login(username, email, psw).pipe(
			delay(500),
			take(1),
			catchError((error, caught) => {
				// console.warn('Error: ', error);
				// console.warn('Caught: ', caught);
				const msgError: RispostaServer = {
					data: null,
					message: 'Errore Log in',
					error: error,
				};
				const msgUtente: MsgUtenteT = {
					mostra: true,
					type: 'error',
					msg: 'Accesso fallito, ti preghiamo di ricontrollare i data inseriti.',
				};
				this.msgService.setObsMsg(msgUtente);
				this.msgService.autoClose(5000);
				return of(msgError);
			}),
			takeUntil(this.distruggi$),
		);
	}

	/**
	 * Funzione di ritorno osservatore informazioni dell'observable che chiama l'api di accesso
	 *
	 * @returns Observer
	 */
	private osservaLogin(): Observer<any> {
		const osservatore: Observer<any> = {
			next: (x) => {
				// console.log('RITORNO', x);
				if (x.data !== null && x.message !== null) {
					const token: string = x.data.tk;
					const contenutoTk = UtilityService.leggiToken(token);
					if (contenutoTk !== null) {
						const auth: AuthType = {
							idLingua: 1,
							token: x.data.tk,
							nome: contenutoTk.data.nome,
							idRuolo: contenutoTk.data.idRuolo,
							idStato: contenutoTk.data.idStato,
							idUtente: contenutoTk.data.idContatto,
							abilita: contenutoTk.data.abilita,
							avvioSessione: Date.now(),
						};
						this.ObsTokenJwt.setObsAutorizza(auth);
						//per sistema checkbox ricordami
						if (this.ricordami) {
							this.ObsTokenJwt.scriviSuLocalStorage(auth);
						}
						this.ObsTokenJwt.scriviSuSessione(auth);

						this.router.navigateByUrl('/home');

						this.chiudiModal();
					} else {
						// console.error('TK');
						this.ctrlForm = false;
						this.ctrlUtente = false;
						return;
					}
				} else {
					// console.error('OBS-TK');
					this.ctrlForm = false;
					this.ctrlUtente = false;
					return;
				}
			},
			error: (error) => {
				// console.error('ERRORE', error);
				const auth: AuthType = {
					idLingua: 1,
					token: null,
					nome: null,
					idRuolo: null,
					idStato: null,
					idUtente: null,
					abilita: null,
					avvioSessione: null,
				};

				this.ObsTokenJwt.setObsAutorizza(auth);
				this.ctrlForm = false;
				this.ctrlUtente = false;
			},
			complete: () => {
				// console.log('COMPLETATO');
			},
		};
		return osservatore;
	}
}
