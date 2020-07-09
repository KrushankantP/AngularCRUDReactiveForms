import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./Components/employee/home.component";
import {PageNotFoundComponent} from "./Components/employee/page-not-found.component";


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  // redirect to the home route if the client side route path is empty
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'employees', loadChildren: "./Components/employee/employee.module#EmployeeModule" },
  // wild card route
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
