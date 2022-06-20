import { Injectable } from '@angular/core';
import { reception } from '../reception/reception.component';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }
  public receptions:reception[] = [
    { no: 1, service_number: '66-GH-34', plate_number: 'AA-1234', refference: 'REF34892', date_received: '22-11-2022', date_finished: '29-11-2022', service_type: "4", status: 'Finished',
    fuel_gauge: '4.5', damage: 'Dead battery', other: 'Paint scratch'} ];
getReception(){
  return this.receptions
}
setReceptions(reception:reception[]){
  this.receptions = reception
}
}
