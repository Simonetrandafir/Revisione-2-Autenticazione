import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MsgUtenteT } from '../type/msgUtente.type';

@Injectable({
	providedIn: 'root',
})
export class MsgUtenteService {
	static dati: MsgUtenteT;
	private MsgUtenteObs$: BehaviorSubject<MsgUtenteT>;

	constructor() {
		this.MsgUtenteObs$ = new BehaviorSubject<MsgUtenteT>(MsgUtenteService.dati);
	}

	setObsMsg(datiMsg: MsgUtenteT) {
		MsgUtenteService.dati = datiMsg;
		this.MsgUtenteObs$.next(datiMsg);
	}

	leggiObsMsg() {
		return this.MsgUtenteObs$;
	}

	autoClose(tempo: number) {
		setTimeout(() => {
			const dati: MsgUtenteT = {
				mostra: false,
				type: 'void',
				msg: '',
			};
			this.setObsMsg(dati);
		}, tempo);
	}
}
