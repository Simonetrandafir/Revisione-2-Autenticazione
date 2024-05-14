import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MsgUtenteService } from 'src/app/service/msg-utente.service';
import { MsgUtenteT } from 'src/app/type/msgUtente.type';

@Component({
	selector: 'app-msg-toast',
	templateUrl: './msg-toast.component.html',
	styleUrls: ['./msg-toast.component.scss'],
})
export class MsgToastComponent {
	msg$: BehaviorSubject<MsgUtenteT>;

	constructor(private msgService: MsgUtenteService) {
		this.msg$ = this.msgService.leggiObsMsg();
	}

	chiudi() {
		const dati: MsgUtenteT = {
			mostra: false,
			type: 'void',
			msg: '',
		};
		this.msgService.setObsMsg(dati);
	}
}
