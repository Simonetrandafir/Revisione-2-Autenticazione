import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Generi } from 'src/app/interface/generi.interface';
import { Film, SerieTv } from 'src/app/interface/utente/streaming.interface';
import { ApiGeneriService } from 'src/app/service/api-generi.service';

@Component({
	selector: 'app-genere-id',
	templateUrl: './genere-id.component.html',
	styleUrls: ['./genere-id.component.scss'],
})
export class GenereIdComponent implements OnInit, AfterViewInit {
	idGenere!: string;
	dataGenere!: Generi;
	dataFilmGenere: Film[] = [];
	dataSerieGenere: SerieTv[] = [];
	distruggi$: Subject<void> = new Subject<void>();
	constructor(private route: ActivatedRoute, private apiGeneri: ApiGeneriService) {}
	ngAfterViewInit(): void {
		this.route.params.subscribe((params) => {
			this.idGenere = params['id'];
		});
		this.apiGeneri
			.getGenereId(this.idGenere)
			.pipe(takeUntil(this.distruggi$))
			.subscribe((data: Generi) => {
				this.dataGenere = data;
			});
	}

	ngOnInit(): void {}
}
