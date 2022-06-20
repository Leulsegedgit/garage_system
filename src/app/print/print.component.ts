import { Component, OnInit } from '@angular/core';
import { reception } from '../reception/reception.component';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor(public print_service:PrintService) { }

  ngOnInit(): void {
    this.receptions = this.print_service.getReception();
  }
  public receptions:reception[] = [
    { no: 1, service_number: '66-GH-34', plate_number: 'AA-1234', refference: 'REF34892', date_received: '22-11-2022', date_finished: '29-11-2022', service_type: "4", status: 'Finished',
    fuel_gauge: '4.5', damage: 'Dead battery', other: 'Paint scratch'} ];
  print(){
 
    window.print()
  }
}
