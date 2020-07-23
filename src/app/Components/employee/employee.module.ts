// employee.module.ts
import { NgModule } from '@angular/core';
import{EmployeeRoutingModule} from "./employee-routing.module";

// Import and declare the components that belong to this Employee Module
import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],

  // If you want the components that belong to this module, available to
  // other modules, that import this module, then include all those
  // components in the exports array. Similarly you can also export the
  // imported Angular Modules
  exports: [
    CreateEmployeeComponent,
    ReactiveFormsModule
  ]

})
export class EmployeeModule { }
