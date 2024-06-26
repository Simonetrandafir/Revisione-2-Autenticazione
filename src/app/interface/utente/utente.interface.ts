import { Indirizzo } from './indirizzo.interface';
import { Recapito } from './recapito.interface';

export interface Utente {
	idContatto: number;
	idStato: number;
	ruolo?: string;
	nome: string;
	cognome: string;
	sesso: string | null;
	codFiscale: string | null;
	partitaIva: string | null;
	cittadinanza: string | null;
	idNazione: number | null;
	citta: string | null;
	provincia: string | null;
	dataNascita: Date;
	indirizzi: Partial<Indirizzo>[];
	recapiti: Partial<Recapito>[];
}
