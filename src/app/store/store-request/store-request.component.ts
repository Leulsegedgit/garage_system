import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { StoreRequestEditComponent } from 'src/app/dialog/store-request-edit/store-request-edit.component';
import { StoreServiceService } from 'src/app/services/store-service.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { EmployeService } from 'src/app/services/employe.service';
import { HelperFunctionsService } from 'src/app/services/helper-functions.service';

export interface store_request {
  no: number;
  part_number: string
  request_number: string;
  service_number: string;
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

   
  constructor(private _store:StoreServiceService,private _helper:HelperFunctionsService,public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    
    this._store.updaterow$.subscribe(
      row => {
        console.log(row);
  console.log(row.no);
  
  this.stores[row.no-1] = row;
  this.dataSource = this.stores; 
  this.deleteStoreRequest('0');
      }
    );
    
    this._store.RefreashRequired.subscribe(
      response=>{
        
        this.deleteStoreRequest('0');
      }
    );

    this.filteredNames = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value=>this.filterNames(value))
    );
  }
private filterNames(name:string): string[]{
  const filtered_name = name.toLowerCase();
  return  this.names.filter(option => 
    option.toLowerCase().includes(filtered_name)
    );
}
  public stores:store_request[] = [
    {no: 1, part_number:'345-466',request_number: '1234' , service_number: '123' , requester: 'Yohannes',approver: 'Bishaw',date: '12-02-2014'},
    {no: 2, part_number:'4335-626-42',request_number: '1235' , service_number: '124' , requester: 'Zelalem',approver: 'Hailu',date: '16-11-2014'},
    {no: 3, part_number:'632-632-65',request_number: '1236' , service_number: '125' , requester: 'Getnet',approver: 'Demle',date: '27-02-2014'},
    {no: 4, part_number:'424-6462-63',request_number: '1237' , service_number: '126' , requester: 'Leulseged',approver: 'Wondimu',date: '12-02-2014'},
    {no: 5, part_number:'632-63-264',request_number: '1238' , service_number: '127' , requester: 'Mehariw',approver: 'Melak',date: '06-5-2014'}  
  ];
  partName = "";
  print = false;
  names: string[] = ['Getnet','Leulseged','Mehariw','Zelalem'];
  getNames(starting:any){
    let names:any = []
    this._helper.getNames(starting).subscribe(
        (data)=>{
          names = data;
          for(let i=0; i<names.length; i++){
            this.names[i]=names[i].name
            
          }
         
        }
      )
  }
  myControl = new FormControl();
  filteredNames: Observable<string[]> | undefined;

  displayedColumns: string[] = ['no','part_number', 'request_number', 'service_number', 'requester','approver','date','edit','delete'];
  dataSource = this.stores;
  getStoreRequest(param:store_request){
    this._store.getStoreRequest(param).subscribe(
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
  addStoreRequest(param:store_request){
    this._store.addStoreRequest(param).subscribe(
      (data)=>{
        
        param.no = this.stores.length+1;
        this.stores.push(param);
          this.dataSource = this.stores;
       
      }
    )
    
  }
  deleteStoreRequest(param:string){
    console.log(param)
    this._store.deleteStoreRequest(param).subscribe(
      (data)=>{
        console.log(this.stores);
         this.stores = this.stores.filter(function(el) { return el.request_number != param; }); 

         this.dataSource = this.stores;   
      }
    )
  }
  

  openDialog(row:any): void {
    let index = row-1;
    
    const dialogRef = this.dialog.open(StoreRequestEditComponent,{data: {
      no: row,
      part_number: this.stores[index].part_number,
      request_number: this.stores[index].request_number,
      service_number: this.stores[index].service_number,
      requester: this.stores[index].requester,
      approver: this.stores[index].approver,
      date: this.stores[index].date
    
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });

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
  this.print = true;
  window.print()
}

}

