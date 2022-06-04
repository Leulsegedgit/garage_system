import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreServiceService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-store-request-edit',
  templateUrl: './store-request-edit.component.html',
  styleUrls: ['./store-request-edit.component.css']
})
export class StoreRequestEditComponent implements OnInit {

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _store_service:StoreServiceService) { }
  
  ngOnInit(): void {
  }
   updateStoreRequest(store:any,no:number){
     store.no= no;
    this._store_service.updateStoreRequest(store);
   }

}