import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreServiceService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-spare-registration-edit',
  templateUrl: './spare-registration-edit.component.html',
  styleUrls: ['./spare-registration-edit.component.css']
})
export class SpareRegistrationEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _store_service:StoreServiceService) { }
  
  ngOnInit(): void {
  }
  updateSpareRegistration(store:any,no:number){
    store.no= no;
    this._store_service.updateSpare(store);
  }
}
