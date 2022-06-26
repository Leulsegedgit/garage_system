import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreIssueEditComponent } from 'src/app/dialog/store-issue-edit/store-issue-edit.component';
import { PrintService } from 'src/app/services/print.service';
import { StoreServiceService, store_request } from 'src/app/services/store-service.service';

export interface store_issue {
  no: number;
  request_number: string;
  issue_refference_number: string;
  part_number: string;
  quantity_requested: number;
  requester: string;
  approver: string;

  date: string;
}

@Component({
  selector: 'app-store-issue',
  templateUrl: './store-issue.component.html',
  styleUrls: ['./store-issue.component.css']
})
export class StoreIssueComponent implements OnInit {
  public quantity_remaining = 0;
 
  constructor(private _store:StoreServiceService,private print_service: PrintService,private _router: Router,public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    
    this._store.updaterow$.subscribe(
      row => {
       
  this.stores[row.no-1] = row;
  this.dataSource = this.stores;
  this.deleteStoreIssue('0');
      }
    );
    this._store.RefreashRequired.subscribe(
      response=>{
        
        this.deleteStoreIssue('0');
      }
    );
  }

  public stores:store_issue[] = [
    {no: 1, request_number: '1234' , issue_refference_number: '123' , part_number: 'Yohannes', quantity_requested: 12,requester: 'Leulseged Wondimu',approver: 'Zelalem Hailu',date: '12-02-2014'},
    ];
    partName = "";
    public stores_request:store_request[] = [
      {no: 1, part_number:'',request_number: '' , service_number: '' , requester: '',approver: '',quantity_requested:  1,date: ''}
    ];
    public  request_by_request_number = false;

  displayedColumns: string[] = ['no','request_number','issue_refference_number', 'part_number', 'quantity_requested','requester','approver', 'date','edit','delete'];
  dataSource = this.stores;
  getStoreIssue(param:store_issue){
    this._store.getStoreIssue(param).subscribe(
      (data)=>{
       // console.log(data[0]);
        this.stores = data;
        for(let i=0; i<this.stores.length; i++){
          this.stores[i].no = i+1;
        }
        this.dataSource = this.stores;
      }
    )
  }
  addStoreIssue(param:store_issue,store_request: store_request){
    param.request_number = store_request.request_number;
    param.requester = store_request.requester
    param.approver = store_request.approver
    param.part_number = store_request.part_number
    param.quantity_requested = store_request.quantity_requested
    this._store.addStoreIssue(param).subscribe(
      (data)=>{
          param.no = this.stores.length+1;
          this.stores.push(param);
          this.dataSource = this.stores;
       
      }
    )
    
this.quantity_remaining = this.quantity_remaining - store_request.quantity_requested;

let store_receive =
  { part_number:store_request.part_number,quantity_remaining:this.quantity_remaining}
  ;
this._store.decrementStoreRemaining(store_receive).subscribe(
  (data)=>{

  }
)
    
  }
  deleteStoreIssue(param:string){
    this._store.deleteStoreIssue(param).subscribe(
      (data)=>{
        console.log(this.stores);
         this.stores = this.stores.filter(function(el) { return el.request_number != param; }); 

         this.dataSource = this.stores;   
      }
    )
  }
  

  openDialog(row:any): void {
    let index = row-1;
    
    const dialogRef = this.dialog.open(StoreIssueEditComponent,{data: {
      no: row,
      request_number: this.stores[index].request_number,
      part_number: this.stores[index].part_number,
      issue_refference_number: this.stores[index].issue_refference_number,
      quantity_requested: this.stores[index].quantity_requested,
      date: this.stores[index].date
    
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });

}
getStoreRequestByRequestNumber(param:store_request){
  this._store.getStoreRequest(param).subscribe(
    (data)=>{
     
     if(data.length==0){
     this.stores_request[0] = {no: 1, part_number:'',request_number: '' , service_number: '' , requester: '',approver: '',quantity_requested: 1,date: ''};
     
     this.request_by_request_number = true
     return
     }

     this._store.getStoreReceiveRemaining(data[0].part_number).subscribe(
      (data)=>{
        console.log(data)
        this.quantity_remaining = data[0].quantity_remaining;
      }
     )
      this.stores_request = data;
      this.request_by_request_number = false;
      }
  )
  
}
getByPartNumber(part_number:string){
  this._store.getByPartNumber(part_number).subscribe(
    data=>{
      if(data.length == 0)
      this.partName = ""
      else
      this.partName = data[0].part_name;
      
    },
    err=>{
      this.partName = ""
    }
  )
}

printData(){
  this.print_service.fetchPrintData(this.stores)
  this.print_service.setPrintPage("store_issue")
    this._router.navigate(['/print']);
    // this.print = true;
    // window.print()
  }
}

