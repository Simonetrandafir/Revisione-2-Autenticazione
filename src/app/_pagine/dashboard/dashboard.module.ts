import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { DashboardKitModule } from 'src/app/_condivisi/dashboard-kit/dashboard-kit.module';

@NgModule({
	declarations: [DashboardComponent],
	imports: [CommonModule, DashboardRoutingModule, DashboardKitModule],
})
export class DashboardModule {}
