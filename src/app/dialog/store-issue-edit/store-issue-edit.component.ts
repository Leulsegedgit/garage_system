import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreServiceService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-store-issue-edit',
  templateUrl: './store-issue-edit.component.html',
  styleUrls: ['./store-issue-edit.component.css']
})
export class StoreIssueEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _store_service:StoreServiceService) { }
  
  ngOnInit(): void {
  }
   updateStoreIssue(store:any,no:number){
     store.no= no;
     
    this._store_service.updateStoreIssue(store);
   }

}