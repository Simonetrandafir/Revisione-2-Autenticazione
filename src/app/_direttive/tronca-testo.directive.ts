import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appTroncaTesto]',
})
export class TroncaTestoDirective {
	constructor(private elemento: ElementRef, private render: Renderer2) {}

	@HostListener('click', ['$event.target']) onClick(target: HTMLElement) {
		this.troncaTxt(target);
	}
	troncaTxt(elemento: HTMLElement) {
		const contenitore = elemento.parentElement;
		const testo = contenitore?.querySelector('.troncaTxt');
		if (contenitore !== null && testo !== null && contenitore && testo) {
			switch (testo.classList.contains('text-truncate')) {
				case true:
					this.render.removeClass(testo, 'text-truncate');
					this.render.removeClass(testo, 'col-9');
					this.render.addClass(testo, 'col-12');
					this.render.removeClass(elemento, 'col-3');

					break;
				case false:
					this.render.addClass(testo, 'text-truncate');
					this.render.removeClass(testo, 'col-12');
					this.render.addClass(testo, 'col-9');
					this.render.addClass(elemento, 'col-3');
					break;
				default:
					break;
			}
		}
	}
}
