import { NgModule } from '@angular/core';
// Exports all the basic Angular directives and pipes
// such as NgIf, NgFor, DecimalPipe etc.
import { CommonModule } from '@angular/common';

// CreateEmployeeComponent uses ReactiveFormsModule directives such as
// formGroup so ReactiveFormsModule needs to be imported into this Module
// An alternative approach would be to create a Shared module and export
// the ReactiveFormsModule from it, so any other module that needs
// ReactiveFormsModule can import it from the SharedModule.
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    // At the moment we do not have any components in this SharedModule
    // that require directives of CommonModule or ReactiveFormsModule
    // So we did not include them here in the imports array. We can
    // export a module without importing it first
  ],
  declarations: [],
  // Our Employee FeatureModule requires the CommonModule directives
  // such as ngIf, ngFor etc. Similarly, Employee FeatureModule also
  // requires ReactiveFormsModule directives. So export CommonModule
  // and ReactiveFormsModule.
  exports: [
    CommonModule,
    ReactiveFormsModule
  ]
})

export class SharedModule { }
