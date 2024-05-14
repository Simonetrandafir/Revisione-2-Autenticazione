import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalizza',
})
export class CapitalizzaPipe implements PipeTransform {
	transform(value: string | undefined): string {
		if (!value) return 'Error Capitalizza';
		return value.charAt(0).toUpperCase() + value.slice(1);
	}
}
