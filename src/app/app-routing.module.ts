import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeesComponent} from "./Components/employee/list-employees.component";
import {CreateEmployeeComponent} from "./Components/employee/create-employee.component";
import {HomeComponent} from "./Components/employee/home.component";
import {PageNotFoundComponent} from "./Components/employee/page-not-found.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  {path:'list', component:ListEmployeesComponent},
  {path:'create', component:CreateEmployeeComponent},
  {path:'edit/:id', component:CreateEmployeeComponent},
  // redirect to the home route if the client side route path is empty
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // wild card route
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
