import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './_componenti/footer/footer.component';
import { MsgToastComponent } from './_componenti/msg-toast/msg-toast.component';
import { BtnDashboardComponent } from './_componenti/btn-dashboard/btn-dashboard.component';
import { BtnGeneriComponent } from './_componenti/btn-generi/btn-generi.component';
import { BtnLogoutComponent } from './_componenti/btn-logout/btn-logout.component';
import { NavbarComponent } from './_componenti/navbar/navbar.component';
import { SidebarComponent } from './_componenti/sidebar/sidebar.component';
import { NavUserComponent } from './_componenti/nav-user/nav-user.component';
import { BtnAccediComponent } from './_componenti/btn-accedi/btn-accedi.component';
import { BtnRegistraComponent } from './_componenti/btn-registra/btn-registra.component';
import { CapitalizzaPipe } from './_pipes/capitalizza.pipe';
import { ConvertiErrorePipe } from './_pipes/converti-errore.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		MsgToastComponent,
		BtnDashboardComponent,
		BtnGeneriComponent,
		BtnLogoutComponent,
		NavbarComponent,
		SidebarComponent,
		NavUserComponent,
		BtnAccediComponent,
		BtnRegistraComponent,
		CapitalizzaPipe,
		ConvertiErrorePipe,
	],
	imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule, ReactiveFormsModule, NgbModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
