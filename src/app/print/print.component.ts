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
  public page = ""

  ngOnInit(): void {
    //this.receptions = this.print_service.getReception();
    this.datas = this.print_service.getPrintData();
    this.page = this.print_service.getPrintPage();
  }
  
    public datas:any[] = [];
  print(){
 
    window.print()
  }
}
