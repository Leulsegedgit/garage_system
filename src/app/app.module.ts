import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { DashboardhomeComponent } from './dashboardhome/dashboardhome.component';
import { DriverComponent } from './driver/driver.component';
import { DashboardToolbarComponent } from './dashboard-toolbar/dashboard-toolbar.component';
import { DashboardSidnavComponent } from './dashboard-sidnav/dashboard-sidnav.component'
import { MaterialModule } from './material/material.module';
import { SupplierComponent } from './supplier/supplier.component';
import { TechnicianComponent } from './technician/technician.component';
import { StoreReceiveComponent } from './store/store-receive/store-receive.component';
import { AllStoreComponent } from './store/store/store.component';
import { StoreRequestComponent } from './store/store-request/store-request.component';
import { StoreReceiveEditComponent } from './dialog/store-receive-edit/store-receive-edit.component';
import { StoreRequestEditComponent } from './dialog/store-request-edit/store-request-edit.component';
import { StoreIssueComponent } from './store/store-issue/store-issue.component';
import { StoreIssueEditComponent } from './dialog/store-issue-edit/store-issue-edit.component';
import { SpareRegistrationComponent } from './store/spare-registration/spare-registration.component';
import { SpareRegistrationEditComponent } from './dialog/spare-registration-edit/spare-registration-edit.component';
import { EmployeDashboardComponent } from './employe/dashboard/employe-dashboard/employe-dashboard.component';
import { DashboardSidenavComponent } from './employe/dashboard/dashboard-sidenav/dashboard-sidenav.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { EmployeRegistrationComponent } from './employe/employe-registration/employe-registration.component';
import { EmployeRegistrationEditComponent } from './dialog/employe-registration-edit/employe-registration-edit.component';
import { SupplierEditComponent } from './dialog/supplier-edit/supplier-edit.component';
import { PrintComponent } from './print/print.component';

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
    DashboardhomeComponent,
    DriverComponent,
    DashboardToolbarComponent,
    DashboardSidnavComponent,
    SupplierComponent,
    TechnicianComponent,
    StoreReceiveComponent,
    AllStoreComponent,
    StoreRequestComponent,
    StoreReceiveEditComponent,
    StoreRequestEditComponent,
    StoreIssueComponent,
    StoreIssueEditComponent,
    SpareRegistrationComponent,
    EmployeDashboardComponent,
    DashboardSidenavComponent,
    EmployeRegistrationComponent,
    EmployeRegistrationEditComponent,
    SpareRegistrationEditComponent,
    SupplierEditComponent,
    PrintComponent
    
  ],
  entryComponents: [StoreReceiveEditComponent,StoreRequestEditComponent,SpareRegistrationEditComponent,StoreIssueEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    
    MaterialModule,
    
  ],
  providers: [UsersService,LoginComponent,RegisterService,AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
