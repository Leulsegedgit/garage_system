import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsService {

  constructor(private http:HttpClient) { }
  getNames(starting:string){
    return this.http.get<any[]>("http://localhost:3000/api/getnames/"+starting)
 }
 getSuppliers(starting:string){
  return this.http.get<any[]>("http://localhost:3000/api/getsuppliers/"+starting)
}
getPlateNumber(starting:string){
  return this.http.get<any[]>("http://localhost:3000/api/getplatenumbers/"+starting)
}
}
