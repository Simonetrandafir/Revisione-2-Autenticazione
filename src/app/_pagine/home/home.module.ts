import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StreamingKitModule } from 'src/app/_condivisi/streaming-kit/streaming-kit.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, StreamingKitModule],
})
export class HomeModule {}
