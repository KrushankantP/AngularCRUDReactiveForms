import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {customValidators} from "../../shared/custom.validators";
import {ObservedValuesFromArray} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "./employee.service";
import {IEmployee} from "./IEmployee";
import {ISkill} from "./ISkill";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employee:IEmployee;
  pageTitle:string;
  //FormBuilder is an Service so that's why we have to inject in Constructor.
  constructor(private fb: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router,
              private _employeeService: EmployeeService) { }

  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  // Group properties on the formErrors object. The UI will bind to these properties
// to display the respective validation messages

  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail':'',
    'emailGroup': '',
    'phone': ''
  };

// This structure stoes all the validation messages for the form Include validation
// messages for confirmEmail and emailGroup properties. Notice to store the
// validation message for the emailGroup we are using emailGroup key. This is the
// same key that the matchEmails() validation function below returns, if the email
// and confirm email do not match.
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be Atmiy.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email do not match.'
    },
    'phone':{
      'required': 'Phone is required.'
    },
  };


  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required,
                      Validators.minLength(2),
                      Validators.maxLength(10)]],
      contactPreference: ['email'],
      //Email Group
      emailGroup:this.fb.group({
      email: ['', [Validators.required,
                  customValidators.emailDomain('Atmiy.com')]],
        confirmEmail:['', [Validators.required]]
      }, {Validator: matchEmails}),

      phone: [''],

      //skills Group
      skills: this.fb.array([this.addSkillFormGroup()]),
    });

    // When any of the form control value in employee form changes
    // our validation function logValidationErrors() is called
    this.employeeForm.valueChanges.subscribe(
      (data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe(
      (data: string) => {
        this.onContactPrefernceChange(data);
      });

    this._route.paramMap.subscribe(params =>{
      const empid = +params.get('id');
      if(empid){
        this.pageTitle='Edit Employee';
        this.getEmployee(empid)
      }else{
        this.pageTitle='Create Employee';
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []
        };
      }
    });
  }

  getEmployee(id:number){
    this._employeeService.getEmployee(id).subscribe(
      (employee:IEmployee) =>{
        // Store the employee object returned by the
        // REST API in the employee property
        this.employee=employee;
        this.editEmployee(employee);
      },
      (err:any) => console.log(err)
    );
  }
  onSubmit():void{
    this.mapFormValuesToEmployeeModel();
    if(this.employee.id) {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => this._router.navigate(['employees']),
        (err: any) => console.log(err)
      );
    }
    else{
      this._employeeService.addEmployee(this.employee).subscribe(
        ()=> this._router.navigate(['employees']),
        (err:any)=>console.log(err)
      );
    }
  }
  mapFormValuesToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  }
  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
    this.employeeForm.setControl('skills',  this.setExistingSkills(employee.skills));
  }

  setExistingSkills(skillSets: ISkill[]):FormArray{
    const fromArray= new FormArray([]);
    skillSets.forEach(s=>{
      fromArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency:s.proficiency
      }));
    });
    return fromArray;
  }
  add
  addSkillFormGroup():FormGroup{
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  // get method to fetch the skillsFrom group Array from the form group and typecast it, into a From Array.
  get skillsFormGroup(){
    return this.employeeForm.get('skills') as FormArray;
  }
    //From the root FormGroup "employeeForm" get a reference to the skills FormArray.
    //The get() method returns the FormArray as an AbstractControl.
    //The push() method calls addSkillFormGroup() method which returns
    // an instance of the FormGroup with the 3 skill related form controls
    addSkillButtonClick():void{
      this.skillsFormGroup.push(this.addSkillFormGroup()) ;
    }

    removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = this.employeeForm.get('skills') as FormArray;
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }

    // If the Selected Radio Button value is "phone", then add the
    // required validator function otherwise remove it
    onContactPrefernceChange(selectedValue: string) {
      const phoneFormControl = this.employeeForm.get('phone');
      if (selectedValue === 'phone') {
        phoneFormControl.setValidators(Validators.required);
      } else {
        phoneFormControl.clearValidators();
      }
      phoneFormControl.updateValueAndValidity();
    }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    //Loop through each control key in the FormGroups
    Object.keys(group.controls).forEach((key: string) => {
      //Get the control. the control can be a nested form group
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // Loop through nested form groups and form controls to check
      // for validation errors. For the form groups and form controls
      // that have failed validation, retrieve the corresponding
      // validation message from validationMessages object and store
      // it in the formErrors object. The UI binds to the formErrors
      // object properties to display the validation errors.
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty || abstractControl.value!=='')) {
        //Get all the validation message of the form control
        //that has failed the validation
        const messages = this.validationMessages[key];
        //Find which validation has failed. For example require minlength or maxlength.
        // Store that error message in the formErrors object.
        // The UI will bind to this object to display the validation errors.
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      //if the control is nested form group, recursive call
      //this same method
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        //if the control is a FormControl
      }
      //we need this additional check to get to the FormGroup
      //in the FormArray and then recursively call this
      // logValidationErrors() method to fix the broken validation
      // if(abstractControl instanceof FormArray){
      //   for(const control of abstractControl.controls){
      //     if(control instanceof FormGroup){
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
    });
  }

  onLoadDataClick(): void {
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }
}

//Nested form group (emailGroup) is passed as a parameter.
// Retrieve email and confirmEmail form controls.
//if the values are equal return null to indicate Validation passed
//otherwise an object with emailMismatch key.
//Please note we used this same key in the validation Message object against emailGroup
//property to store the corresponding validation error message
function matchEmails(group:AbstractControl): {[key: string]: any} | null{
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');
  // If confirm email control value is not an empty string, and if the value
  // does not match with email control value, then the validation fails
  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine
    && confirmEmailControl.value==='') {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}
