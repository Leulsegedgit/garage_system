import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule,routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersService } from './services/users.service';
import { MainAdminPageComponent } from './main-admin-page/main-admin-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from './services/register.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { ReceptionComponent } from './reception/reception.component';
import { VehicleRegistrationComponent } from './vehicle-registration/vehicle-registration.component';
import { StoreRequestComponent } from './store-request/store-request.component';
import { DashboardhomeComponent } from './dashboardhome/dashboardhome.component';
import { DriverComponent } from './driver/driver.component';
import { DashboardToolbarComponent } from './dashboard-toolbar/dashboard-toolbar.component';
import { DashboardSidnavComponent } from './dashboard-sidnav/dashboard-sidnav.component'
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    PageNotFoundComponent,
    MainAdminPageComponent,
    AdminDashboardComponent,
    ReceptionComponent,
    VehicleRegistrationComponent,
    StoreRequestComponent,
    DashboardhomeComponent,
    DriverComponent,
    DashboardToolbarComponent,
    DashboardSidnavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    
    MaterialModule,
    
  ],
  providers: [UsersService,RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
