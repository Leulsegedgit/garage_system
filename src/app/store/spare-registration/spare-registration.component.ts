import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpareRegistrationEditComponent } from 'src/app/dialog/spare-registration-edit/spare-registration-edit.component';
import { StoreServiceService } from 'src/app/services/store-service.service';

export interface spare {
  no: number;
  plate_number: string;
  receive_vocher_number: string;
  part_number: string;
  receiver: string;
  deliverer: string;
  supplier: string;
  refference: string;
  unit_price: number;
  quantity_received: number;
  quantity_remaining: number;
  
  date: string;
}

@Component({
  selector: 'app-spare-registration',
  templateUrl: './spare-registration.component.html',
  styleUrls: ['./spare-registration.component.css']
})
export class SpareRegistrationComponent implements OnInit {

  constructor(private _store:StoreServiceService,public dialog: MatDialog) { 

  }
 
  ngOnInit(): void {
    
    this._store.updaterow$.subscribe(
      row => {
        console.log(row);
  console.log(row.no);
  
  this.spares[row.no-1] = row;
  this.dataSource = this.spares;
  this.deleteSpare('0');
      }
    );
    this._store.RefreashRequired.subscribe(
      response=>{
        
        this.deleteSpare('0');
      }
    );
  }
 
  public spares:spare[] = [
    {no: 1,plate_number:'aa-1234',receive_vocher_number:'123-54', part_number:'345-466',receiver: 'Alemayehu' , deliverer: 'Yohannes' , supplier: 'Yohannes',refference: 'TT-56',unit_price:234.6,quantity_received:86,quantity_remaining:23,date: '12-02-2014'},
    ];
  displayedColumns: string[] = ['no','plate_number','receive_vocher_number','part_number', 'receiver', 'deliverer', 'supplier','refference','unit_price','quantity_received','quantity_remaining','date','edit','delete'];
  dataSource = this.spares;
  getSpare(param:spare){
    this._store.getSpare(param).subscribe(
      (data)=>{
       // console.log(data[0]);
        this.spares = data;
        for(let i=0; i<this.spares.length; i++){
          this.spares[i].no = i+1;
        }
        this.dataSource = this.spares;
      }
    )
  }
  addSpare(param:spare){
    this._store.addSpare(param).subscribe(
      (data)=>{
        
        param.no = this.spares.length+1;
        this.spares.push(param);
          this.dataSource = this.spares;
       
      }
    )
    
  }
  deleteSpare(param:string){
    console.log(param)
    this._store.deleteSpare(param).subscribe(
      (data)=>{
        console.log(this.spares);
         this.spares = this.spares.filter(function(el) { return el.part_number != param; }); 
 
         this.dataSource = this.spares;   
      }
    )
  }
  
 
  openDialog(row:any): void {
    let index = row-1;
    
    const dialogRef = this.dialog.open(SpareRegistrationEditComponent,{data: {
     no: row,
 plate_number: this.spares[index].plate_number,
 receive_vocher_number: this.spares[index].receive_vocher_number,
 part_number: this.spares[index].part_number,
 receiver: this.spares[index].receiver,
 deliverer: this.spares[index].deliverer,
 supplier: this.spares[index].supplier,
 refference: this.spares[index].refference,
 unit_price: this.spares[index].unit_price,
 quantity_received: this.spares[index].quantity_received,
 quantity_remaining: this.spares[index].quantity_remaining
   
    }});
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
 
 }
 
 
 }
 
 