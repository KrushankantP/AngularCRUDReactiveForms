import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./Components/employee/home.component";
import {PageNotFoundComponent} from "./Components/employee/page-not-found.component";
import {CustomPreloadingService} from "./Services/custom-preloading.service";


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  // redirect to the home route if the client side route path is empty
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'employees',
    // set the preload property to true, using the route data property
    // If you do not want the module to be preloaded set it to false
    data: { preload: true },
    loadChildren: "./Components/employee/employee.module#EmployeeModule" },
  // wild card route
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: CustomPreloadingService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
