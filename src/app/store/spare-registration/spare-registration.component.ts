import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpareRegistrationEditComponent } from 'src/app/dialog/spare-registration-edit/spare-registration-edit.component';
import { PrintService } from 'src/app/services/print.service';
import { StoreServiceService } from 'src/app/services/store-service.service';

export interface spare {
  no: number;
  part_number: string;
  part_name: string;
  unit_measure: string;
  vehicle_type: string;
  unit_price: string;
  store_number: number;
  part_type: string;
  location: string;
  class_type: string;
  heavy_light: string;
  consumable: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-spare-registration',
  templateUrl: './spare-registration.component.html',
  styleUrls: ['./spare-registration.component.css']
})
export class SpareRegistrationComponent implements OnInit {

  constructor(private _store:StoreServiceService,private print_service: PrintService,private _router: Router,public dialog: MatDialog) { 

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
   { no: 1, part_number: '66-GH-34', part_name: 'CABLE', unit_measure: 'SET', vehicle_type: 'TOYOTA', unit_price: '949', store_number: 4, part_type: 'break system',
    location: '15C', class_type: 'A', heavy_light: 'LIGHT', consumable: 'NON CONSUMABLE', description: 'fRAIN CABLE', date: '23-10-2022'}
];

  displayedColumns: string[] = ['no','part_number','part_name','unit_measure', 'vehicle_type',  'store_number','part_type','location','unit_price','class_type','heavy_light','consumable','description','date','edit','delete'];
  dataSource = this.spares;
  getSpare(param:spare){

    this._store.getSpare(param).subscribe(
      (data)=>{
        
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
    this._store.deleteSpare(param).subscribe(
      (data)=>{
        this.spares = this.spares.filter(function(el) { return el.part_number != param; }); 
        this.dataSource = this.spares;   
      }
    )
  }
  
 
  openDialog(row:any): void {
    let index = row-1;
    
    const dialogRef = this.dialog.open(SpareRegistrationEditComponent,{data: {
      no: this.spares[index].no,
      part_number: this.spares[index].part_number,
      part_name: this.spares[index].part_name,
      unit_measure: this.spares[index].unit_measure,
      vehicle_type: this.spares[index].vehicle_type,
      unit_price: this.spares[index].unit_price,
      store_number: this.spares[index].store_number,
      part_type: this.spares[index].part_type,
      location: this.spares[index].location,
      class_type: this.spares[index].class_type,
      heavy_light: this.spares[index].heavy_light,
      consumable: this.spares[index].consumable,
      description: this.spares[index].description,
      date: this.spares[index].date,
    }});
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
 
 }
 printData(){
  this.print_service.fetchPrintData(this.spares)
  this.print_service.setPrintPage("spare")
    this._router.navigate(['/print']);
    // this.print = true;
    // window.print()
  }
 
 }
 
 