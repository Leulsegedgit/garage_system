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
    store.class_type = this.data.class_type
    store.consumable = this.data.consumable
    store.heavy_light = this.data.heavy_light
    
    this._store_service.updateSpare(store);
  }
}
