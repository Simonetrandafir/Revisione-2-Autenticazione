import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePswRoutingModule } from './update-psw-routing.module';
import { UpdatePswComponent } from './update-psw.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [UpdatePswComponent],
	imports: [CommonModule, UpdatePswRoutingModule, ReactiveFormsModule, NgbProgressbarModule],
})
export class UpdatePswModule {}
