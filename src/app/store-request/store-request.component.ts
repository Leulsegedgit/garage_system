import { Component, OnInit } from '@angular/core';
import { StoreServiceService } from '../services/store-service.service';
export interface store {
  no: number;
  request_number: number;
  service_number: number;
  requester: string;
  approver: string;
  date: string;
}

/* const ELEMENT_DATA: store[] = [
  {no: 1, request: 'r1234', service: 'ser123', requester: 'Yohannes',approver: 'Bishaw',date: '12-02-2014'},
  {no: 2, request: 'r1235', service: 'ser124', requester: 'Zelalem',approver: 'Hailu',date: '16-11-2014'},
  {no: 3, request: 'r1236', service: 'ser125', requester: 'Getnet',approver: 'Demle',date: '27-02-2014'},
  {no: 4, request: 'r1237', service: 'ser126', requester: 'Leulseged',approver: 'Wondimu',date: '12-02-2014'},
  {no: 5, request: 'r1238', service: 'ser127', requester: 'Mehariw',approver: 'Melak',date: '06-5-2014'}  
]; */

@Component({
  selector: 'app-store-request',
  templateUrl: './store-request.component.html',
  styleUrls: ['./store-request.component.css']
})
export class StoreRequestComponent implements OnInit {

  constructor(private _store:StoreServiceService) { 

  }

  ngOnInit(): void {
  }

  public stores:store[] = [
    {no: 1, request_number: 1234 , service_number: 123 , requester: 'Yohannes',approver: 'Bishaw',date: '12-02-2014'},
    {no: 2, request_number: 1235 , service_number: 124 , requester: 'Zelalem',approver: 'Hailu',date: '16-11-2014'},
    {no: 3, request_number: 1236 , service_number: 125 , requester: 'Getnet',approver: 'Demle',date: '27-02-2014'},
    {no: 4, request_number: 1237 , service_number: 126 , requester: 'Leulseged',approver: 'Wondimu',date: '12-02-2014'},
    {no: 5, request_number: 1238 , service_number: 127 , requester: 'Mehariw',approver: 'Melak',date: '06-5-2014'}  
  ];
  displayedColumns: string[] = ['no', 'request_number', 'service_number', 'requester','approver','date','action'];
  dataSource = this.stores;
  getStore(param:store){
    this._store.getStore(param).subscribe(
      (data)=>{
        console.log(data[0]);
        this.stores = data;
        this.dataSource = this.stores;
      }
    )
  }
  addStore(param:store){
    this._store.addStore(param).subscribe(
      (data)=>{
        
        this.stores.push(param);
        this.dataSource = this.stores;
       
      }
    )
  }
  deleteStore(param:number){
    console.log(param)
    this._store.deleteStore(param).subscribe(
      (data)=>{
         this.stores = this.stores.filter(function(el) { return el.request_number != param; }); 
         this.dataSource = this.stores;
         
      }
    )
  }
}
