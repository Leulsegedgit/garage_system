import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreServiceService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-store-receive-edit',
  templateUrl: './store-receive-edit.component.html',
  styleUrls: ['./store-receive-edit.component.css']
})
export class StoreReceiveEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _store_service:StoreServiceService) { }
  
  ngOnInit(): void {
  }
   updateStoreReceive(store:any,no:number){
     store.no= no;
    this._store_service.updateStoreReceive(store);
   }


}
