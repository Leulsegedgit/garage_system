import { Injectable } from '@angular/core';
import { reception } from '../reception/reception.component';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }
  
    public datas:any[] = [];
    public page = ""

    setPrintPage(page:string){
      this.page = page
    }
    getPrintPage(){
      return this.page
    }

fetchPrintData(data:any){
  this.datas = data
}
getPrintData(){
  return this.datas
}
}
