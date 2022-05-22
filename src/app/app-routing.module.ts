import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { MainUserPageComponent } from "./main-user-page/main-user-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { MainAdminPageComponent } from "./main-admin-page/main-admin-page.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ReceptionComponent } from "./reception/reception.component";
import { DashboardhomeComponent } from "./dashboardhome/dashboardhome.component";
import { StoreRequestComponent } from "./store-request/store-request.component";
import { VehicleRegistrationComponent } from "./vehicle-registration/vehicle-registration.component";
import { DriverComponent } from "./driver/driver.component";
import { SupplierComponent } from "./supplier/supplier.component";


const routes: Routes = [
    // {path:'student',loadChildren:()=>import("./login/login.component").then(m=>)}
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'user', component: MainUserPageComponent},
    {path: 'admin', component: MainAdminPageComponent
},
    {path: 'dashboard', component: AdminDashboardComponent,
        children: [
            {
                path: '', component: DashboardhomeComponent
            },
            {
                path: 'home', component: DashboardhomeComponent
            },
            {
                path: 'reception', component: ReceptionComponent
            },
            {
                path: 'store', component: StoreRequestComponent
            },
            {
                path: 'vehicle', component: VehicleRegistrationComponent
            },
            {
                path: 'driver', component: DriverComponent
            },
            {
                path: 'supplier', component: SupplierComponent
            }
        ]
    
         },
    {path: 'reception', component: ReceptionComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: PageNotFoundComponent}
    
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [MainUserPageComponent,MainAdminPageComponent,RegisterComponent,PageNotFoundComponent,AdminDashboardComponent]