import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpareRegistrationEditComponent } from '../dialog/spare-registration-edit/spare-registration-edit.component';
import { VehicleService } from '../services/vehicle.service';

export interface vehicle {
  no: number;
  plate_number: string;
  chassi_number: string;
  fuel_type: string;
  factory: string;
  price: number;
  made_in: string;
  service_type: string;
  made_year: string;
  cc: string;
  tyers: string;
  description: string;
  _condition: string;
  heavy_light: string;
  load_type: string;
}

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.css']
})
export class VehicleRegistrationComponent implements OnInit {

  constructor(private _vehicle:VehicleService,public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this._vehicle.updaterow$.subscribe(
      row => {
        console.log(row);
  console.log(row.no);
  
  this.spares[row.no-1] = row;
  this.dataSource = this.spares;
  this.deleteVehicle('0');
      }
    );
    this._vehicle.RefreashRequired.subscribe(
      response=>{
        
        this.deleteVehicle('0');
      }
    );
  }
 
  public spares:vehicle[] = [
   { no: 1, plate_number: '66-GH-34', chassi_number: 'CABLE', fuel_type: 'SET', factory: 'TOYOTA', price: 949.99, made_in: 'Japan', service_type: 'break system',
   made_year: '11-12-2022', cc: '7', tyers: '4', _condition: 'New', description: 'New model 5 cylinder', heavy_light: 'Heavy',load_type: 'Solid'}
];

  displayedColumns: string[] = ['no','plate_number','chassi_number','fuel_type', 'factory',  'price','made_in','service_type','made_year','cc','tyers','description','heavy_light','_condition','load_type','edit','delete'];
 
  dataSource = this.spares;
  getVehicle(param:vehicle){
console.log(param)
    this._vehicle.getVehicle(param).subscribe(
      (data)=>{
        
       this.spares = data;
        for(let i=0; i<this.spares.length; i++){
          this.spares[i].no = i+1;
        }
        this.dataSource = this.spares;
       
      }
    )
  }
  addVehicle(param:vehicle){
   this._vehicle.addVehicle(param).subscribe(
      (data)=>{
        
        param.no = this.spares.length+1;
        this.spares.push(param);
          this.dataSource = this.spares;
       
      }
    )
    
  }
  deleteVehicle(param:string){
    this._vehicle.deleteVehicle(param).subscribe(
      (data)=>{
        this.spares = this.spares.filter(function(el) { return el.plate_number != param; }); 
        this.dataSource = this.spares;   
      }
    )
  }
  
 
  openDialog(row:any): void {
    let index = row-1;
    
    const dialogRef = this.dialog.open(SpareRegistrationEditComponent,{data: {
      no: this.spares[index].no,
      plate_number: this.spares[index].plate_number,
      chassi_number: this.spares[index].chassi_number,
      fuel_type: this.spares[index].fuel_type,
      factory: this.spares[index].factory,
      price: this.spares[index].price,
      made_in: this.spares[index].made_in,
      service_type: this.spares[index].service_type,
      made_year: this.spares[index].made_year,
      cc: this.spares[index].cc,
      tyers: this.spares[index].tyers,
      description: this.spares[index].description,
      _condition: this.spares[index]._condition,
      heavy_light: this.spares[index].heavy_light,
    }});
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
 
 }
 
 
 }
 
 