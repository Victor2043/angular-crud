import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import {HttpHeaders, HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SinglePageService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
    'Content-Length':'<calculated when request is sent>',
    'Access-Control-Allow-Origin':'*',
    'Accept':'*/*',
    'Accept-Encoding':'gzip, deflate, br',
    'Connection':'keep-alive'})
  }

  getCars(){
    return this.http.get<any>(`${environment.service}/get`)
    .pipe(catchError(this.errorHandl))
  }

  insertCar(car){
    return this.http.post<any>(`${environment.service}/insert`, car, this.httpOptions)
    .pipe(catchError(this.errorHandl))
  }

  updateCar(car){
    return this.http.put<any>(`${environment.service}/update`, car)
   .pipe(catchError(this.errorHandl))
  }

  deleteCar(carID){
    return this.http.delete<any>(`${environment.service}/delete/`+ carID, this.httpOptions)
   .pipe(catchError(this.errorHandl))
  }


  errorHandl(error){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code:'${error.status}'\n Message:' ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
    }
  }


