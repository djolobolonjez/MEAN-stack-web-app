import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
import { ProfileComponent } from './profile/profile.component';
import { ObjectsComponent } from './objects/objects.component';
import { AgenciesComponent } from './agencies/agencies.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { ClientJobsComponent } from './client-jobs/client-jobs.component';
import { WorkersComponent } from './workers/workers.component';
import { AgencyJobsComponent } from './agency-jobs/agency-jobs.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "admin-login", component: AdminLoginComponent},
  { path: "admin", component: AdminComponent},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "client", component: ClientComponent, children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full'},
    { path: 'profile', component: ProfileComponent },
    { path: 'objects', component: ObjectsComponent },
    { path: 'agencies', component: AgenciesComponent },
    { path: 'client-jobs', component: ClientJobsComponent }
  ] 
  },
  { path: "agency", component: AgencyComponent, children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full'},
    { path: ':id/:userType/profile', component: ProfileComponent },
    { path: ':id/:userType/workers', component: WorkersComponent },
    { path: 'agency-jobs', component: AgencyJobsComponent }
  ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
