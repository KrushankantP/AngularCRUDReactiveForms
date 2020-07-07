import { Injectable } from '@angular/core';
import {IEmployee} from "./IEmployee";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  basUrl='http://localhost:3000/employees';

  constructor(private httpClient:HttpClient) { }

  getEmployees():Observable<IEmployee[]>{
    return this.httpClient.get<IEmployee[]>(this.basUrl)
      .pipe(catchError(this.handleError));
  }
  private handleError(errorResponse:HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.error('Client side Error: ', errorResponse.error.message);
    }else{
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is a problem with the service. Please try again after sometime.')
  }

  getEmployee(id:number): Observable<IEmployee>{
    return this.httpClient.get<IEmployee>(this.basUrl + id)
      .pipe(catchError(this.handleError))
  }

  addEmployee(employee:IEmployee): Observable<IEmployee>{
    return this.httpClient.post<IEmployee>(this.basUrl, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: IEmployee): Observable<void> {
    return this.httpClient.put<void>(this.basUrl + employee.id, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }
  deleteEmployee(id: number): Observable<void>{
    return this.httpClient.delete<void>(this.basUrl+id)
      .pipe(catchError(this.handleError));
  }
}
