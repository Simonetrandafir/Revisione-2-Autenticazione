import { Pipe, PipeTransform } from '@angular/core';
interface CustomErrors {
	ctrl?: string;
}
@Pipe({
	name: 'convertiErrore',
})
export class ConvertiErrorePipe implements PipeTransform {
	transform(errors: CustomErrors): string | null {
		if (errors && errors.ctrl) {
			return errors.ctrl;
		}
		return null;
	}
}
