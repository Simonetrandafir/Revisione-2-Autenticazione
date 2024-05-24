/**
 * --------- FILM
 *
 * @param idFilm number
 * @param idCategoria number
 * @param idGenere number
 * @param titolo string
 * @param trama string
 * @param durataMin string
 * @param annoUscita string
 * @param regista? string | null
 * @param attori? string | null
 * @param visualizzato string
 * @param idFile? number | null
 * @param idVideo? number | null
 */
export interface Film {
	idFilm: number;
	idCategoria: number;
	idGenere: number;
	titolo: string;
	trama: string;
	durataMin: string;
	annoUscita: string;
	regista?: string | null;
	attori?: string | null;
	visualizzato: string;
	idFile?: number | null;
	idVideo?: number | null;
}
/**
 * --------- SERIE TV
 *
 * @param idSerieTv number
 * @param idCategoria number
 * @param idGenere number
 * @param titolo string
 * @param trama string
 * @param totStagioni number
 * @param nEpisodi number
 * @param regista? string | null
 * @param attori? string | null
 * @param annoInizio string | null
 * @param annoFine? string | null
 * @param visualizzato string
 * @param idFile? number | null
 * @param idVideo? number | null
 */
export interface SerieTv {
	idSerieTv: number;
	idCategoria: number;
	idGenere: number;
	titolo: string;
	trama: string;
	totStagioni: number;
	nEpisodi: number;
	regista?: string | null;
	attori?: string | null;
	annoInizio: string | null;
	annoFine?: string | null;
	visualizzato: string;
	idFile?: number | null;
	idVideo?: number | null;
}
/**
 * --------- EPISODI
 *
 * @param idEpisodio number
 * @param idSerieTv number
 * @param titolo string
 * @param trama string
 * @param stagione number
 * @param episodio number
 * @param durata number
 * @param anno? string | null
 * @param visualizzato string
 * @param idFile? number | null
 * @param idVideo? number | null
 */
export interface Episodi {
	idEpisodio: number;
	idSerieTv: number;
	titolo: string;
	trama: string;
	stagione: number;
	episodio: number;
	durata: number;
	anno?: string | null;
	visualizzato: string;
	idFile?: number | null;
	idVideo?: number | null;
}

/**
 * @param idFile number
 * @param idRecord number
 * @param tabella string
 * @param nome string
 * @param size number
 * @param posizione string
 * @param ext string
 * @param descrizione string
 * @param formato string
 *
 */
export interface Files {
	idFile: number;
	idRecord: number | null;
	tabella: string | null;
	nome: string;
	size: number;
	posizione: string;
	ext: string;
	descrizione: string | null;
	formato: string | null;
}
