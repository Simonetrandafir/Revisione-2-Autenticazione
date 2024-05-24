import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfiloRoutingModule } from './profilo-routing.module';
import { ProfiloComponent } from './profilo.component';
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfiloKitModule } from 'src/app/_condivisi/profilo-kit/profilo-kit.module';

@NgModule({
	declarations: [ProfiloComponent],
	imports: [CommonModule, ProfiloRoutingModule, NgbScrollSpyModule, ProfiloKitModule],
	exports: [],
})
export class ProfiloModule {}
