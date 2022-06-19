import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { SupplierEditComponent } from '../dialog/supplier-edit/supplier-edit.component';
import { HelperFunctionsService } from '../services/helper-functions.service';
import { SupplierService } from '../services/supplier.service';

export interface supplier {
  no: number;
  name: string
  supplier_id: string;
  contact: string;
  address: string;
  tel1: string;
  tel2: string;
  website: string;
  
  date: string;
}


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

     
  constructor(private _supplier:SupplierService,private _helper:HelperFunctionsService,public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    
    this._supplier.updaterow$.subscribe(
      row => {
        console.log(row);
  console.log(row.no);
  
  this.suppliers[row.no-1] = row;
  this.dataSource = this.suppliers; 
  this.deleteSupplier('0');
      }
    );
    
    this._supplier.RefreashRequired.subscribe(
      response=>{
        
        this.deleteSupplier('0');
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
  public suppliers:supplier[] = [
    {no: 1, name:'METEC',supplier_id: 'SUP-1234' , contact: '2511193345368' , tel1: '0912345678',tel2: '098765432',address: 'Mexico',website: 'www.metc.com' ,date: '12-02-2014'}
    ];
  
  print = false;
  names: string[] = ['Metec','ABY','JAGUAR','LION'];
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

  displayedColumns: string[] = ['no','name', 'supplier_id', 'contact', 'address','tel1','tel2','website','date','edit','delete'];
  dataSource = this.suppliers;
  getSupplier(param:supplier){
    this._supplier.getSupplier(param).subscribe(
      (data)=>{
       // console.log(data[0]);
        this.suppliers = data;
        for(let i=0; i<this.suppliers.length; i++){
          this.suppliers[i].no = i+1;
        }
        this.dataSource = this.suppliers;
      }
    )
  }
  addSupplier(param:supplier){
    console.log(param)
    this._supplier.addSupplier(param).subscribe(
      (data)=>{
        
        param.no = this.suppliers.length+1;
        this.suppliers.push(param);
          this.dataSource = this.suppliers;
       
      }
    )
    
  }
  deleteSupplier(param:string){
    console.log(param)
    this._supplier.deleteSupplier(param).subscribe(
      (data)=>{
        console.log(this.suppliers);
         this.suppliers = this.suppliers.filter(function(el) { return el.supplier_id != param; }); 

         this.dataSource = this.suppliers;   
      }
    )
  }
  

  openDialog(row:any): void {
    let index = row-1;
    
    const dialogRef = this.dialog.open(SupplierEditComponent,{data: {
      no: row,
      name: this.suppliers[index].name,
      supplier_id: this.suppliers[index].supplier_id,
      contact: this.suppliers[index].contact,
      address: this.suppliers[index].address,
      tel1: this.suppliers[index].tel1,
      tel2: this.suppliers[index].tel2,
      website: this.suppliers[index].website,
      date: this.suppliers[index].date
    
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });

}

printData(){
  this.print = true;
  window.print()
}

}

