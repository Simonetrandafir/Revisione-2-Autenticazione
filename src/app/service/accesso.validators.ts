import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const CtrlUsername: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value.trim();
	const regex: RegExp = /^[a-zA-Z\d$%&_!?-]+$/;

	if (value === '') {
		return { ctrl: "L'username \u00E8 obbligatoria" };
	} else if (value && !regex.test(value)) {
		return { ctrl: "L'username pu\u00F2 contenere solo lettere, numeri e i seguenti caratteri: '$ & _ ! ? -'" };
	} else if (value && value.length >= 45) {
		return { ctrl: "L'username \u00E8 troppo lunga" };
	} else if (value && value.length <= 2) {
		return { ctrl: "L' username \u00E8 troppo breve" };
	} else {
		return null;
	}
};

export const CtrlEmail: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value.trim();
	const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (value === '') {
		return { ctrl: "L'email \u00E8 obbligatoria" };
	} else if (value && !regex.test(value)) {
		return { ctrl: "L'email non \u00E8 valida" };
	} else if (value && value.length >= 60) {
		return { ctrl: "L'email \u00E8 troppo lunga" };
	} else if (value && value.length <= 6) {
		return { ctrl: "L' email \u00E8 troppo breve" };
	} else {
		return null;
	}
};

export const CtrlPsw: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value.trim();
	const regex: RegExp = /^[a-zA-Z\d$%&_.!?-]+$/;

	if (value === '') {
		return { ctrl: 'La password \u00E8 obbligatoria' };
	} else if (value && !regex.test(value)) {
		return { ctrl: "La password pu\u00F2 contenere solo lettere, numeri e i seguenti caratteri: '$ & _ ! ? -'" };
	} else if (value && value.length >= 45) {
		return { ctrl: 'La password \u00E8 troppo lunga' };
	} else if (value && value.length <= 7) {
		return { ctrl: 'La password \u00E8 troppo breve' };
	} else {
		return null;
	}
};
