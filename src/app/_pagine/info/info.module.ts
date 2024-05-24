import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { InfoKitModule } from 'src/app/_condivisi/info-kit/info-kit.module';

@NgModule({
	declarations: [InfoComponent],
	imports: [CommonModule, InfoRoutingModule, InfoKitModule],
})
export class InfoModule {}
