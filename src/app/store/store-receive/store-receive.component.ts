import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable,startWith } from 'rxjs';
import { StoreReceiveEditComponent } from 'src/app/dialog/store-receive-edit/store-receive-edit.component';
import { HelperFunctionsService } from 'src/app/services/helper-functions.service';
import { StoreServiceService } from 'src/app/services/store-service.service';

export interface store_receive {
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
  selector: 'app-store-receive',
  templateUrl: './store-receive.component.html',
  styleUrls: ['./store-receive.component.css']
})
export class StoreReceiveComponent implements OnInit {
  
 
 constructor(private _store:StoreServiceService,private _helper:HelperFunctionsService,public dialog: MatDialog) { 

 }
 myControl = new FormControl();
  filteredNames: Observable<string[]> | undefined;

 ngOnInit(): void {
   
   this._store.updaterow$.subscribe(
     row => {
       
 this.stores[row.no-1] = row;
 this.dataSource = this.stores;
 this.deleteStoreReceive('0');
     }
   );
   this._store.RefreashRequired.subscribe(
     response=>{
       
       this.deleteStoreReceive('0');
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
 public stores:store_receive[] = [
   {no: 1,plate_number:'aa-1234',receive_vocher_number:'123-54', part_number:'345-466',receiver: 'Alemayehu' , deliverer: 'Yohannes' , supplier: 'Yohannes',refference: 'TT-56',unit_price:234.6,quantity_received:86,quantity_remaining:23,date: '12-02-2014'},
   ];
   partName = "";
   quantity_received = "";
   names: string[] = ['Metec','ABY','JAGUAR','LION'];
 displayedColumns: string[] = ['no','plate_number','receive_vocher_number','part_number', 'receiver', 'deliverer', 'supplier','refference','unit_price','quantity_received','quantity_remaining','date','edit','delete'];
 dataSource = this.stores;
 getStoreReceive(param:store_receive){
   this._store.getStoreReceive(param).subscribe(
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
 addStoreReceive(param:store_receive,sup:string){
  param.quantity_remaining = param.quantity_received;
  param.supplier = sup;
   this._store.addStoreReceive(param).subscribe(
     (data)=>{
       
       param.no = this.stores.length+1;
       this.stores.push(param);
         this.dataSource = this.stores;
      
     }
   )
   
 }
 deleteStoreReceive(param:string){
   console.log(param)
   this._store.deleteStoreReceive(param).subscribe(
     (data)=>{
       console.log(this.stores);
        this.stores = this.stores.filter(function(el) { return el.receive_vocher_number != param; }); 

        this.dataSource = this.stores;   
     }
   )
 }
 

 openDialog(row:any): void {
   let index = row-1;
   
   const dialogRef = this.dialog.open(StoreReceiveEditComponent,{data: {
    no: row,
plate_number: this.stores[index].plate_number,
receive_vocher_number: this.stores[index].receive_vocher_number,
part_number: this.stores[index].part_number,
receiver: this.stores[index].receiver,
deliverer: this.stores[index].deliverer,
supplier: this.stores[index].supplier,
refference: this.stores[index].refference,
unit_price: this.stores[index].unit_price,
quantity_received: this.stores[index].quantity_received,
quantity_remaining: this.stores[index].quantity_remaining
  
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
getNames(starting:any){
  let names:any = []
  console.log(starting)
  this._helper.getSuppliers(starting).subscribe(
      (data:any)=>{
        console.log(data)
        names = data;
        if(data.length > 0)
        for(let i=0; i<names.length; i++){
          this.names[i]=names[i].name
          
        }
       
      }
    )
}
}

