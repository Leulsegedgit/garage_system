import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpareRegistrationEditComponent } from '../dialog/spare-registration-edit/spare-registration-edit.component';
import { VehicleEditComponent } from '../dialog/vehicle-edit/vehicle-edit.component';
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
  
  this.vehicles[row.no-1] = row;
  this.dataSource = this.vehicles;
  this.deleteVehicle('0');
      }
    );
    this._vehicle.RefreashRequired.subscribe(
      response=>{
        
        this.deleteVehicle('0');
      }
    );
  }
 
  public vehicles:vehicle[] = [
   { no: 1, plate_number: '66-GH-34', chassi_number: 'CH-6288', fuel_type: 'BENZENE', factory: 'TOYOTA', price: 949.99, made_in: 'Japan', service_type: 'Transportation',
   made_year: '11-12-2022', cc: '7', tyers: '4', _condition: 'New', description: 'New model 5 cylinder', heavy_light: 'Heavy',load_type: 'Solid'}
];

  displayedColumns: string[] = ['no','plate_number','chassi_number','fuel_type', 'factory',  'price','made_in','service_type','made_year','cc','tyers','description','heavy_light','_condition','load_type','edit','delete'];
 
  dataSource = this.vehicles;
  getVehicle(param:vehicle){
console.log(param)
    this._vehicle.getVehicle(param).subscribe(
      (data)=>{
        
       this.vehicles = data;
        for(let i=0; i<this.vehicles.length; i++){
          this.vehicles[i].no = i+1;
        }
        this.dataSource = this.vehicles;
       
      }
    )
  }
  addVehicle(param:vehicle){
   this._vehicle.addVehicle(param).subscribe(
      (data)=>{
        
        param.no = this.vehicles.length+1;
        this.vehicles.push(param);
          this.dataSource = this.vehicles;
       
      }
    )
    
  }
  deleteVehicle(param:string){
    this._vehicle.deleteVehicle(param).subscribe(
      (data)=>{
        this.vehicles = this.vehicles.filter(function(el) { return el.plate_number != param; }); 
        this.dataSource = this.vehicles;   
      }
    )
  }
  
 
  openDialog(row:any): void {
    let index = row-1;
    
    const dialogRef = this.dialog.open(VehicleEditComponent,{data: {
      no: this.vehicles[index].no,
      plate_number: this.vehicles[index].plate_number,
      chassi_number: this.vehicles[index].chassi_number,
      fuel_type: this.vehicles[index].fuel_type,
      factory: this.vehicles[index].factory,
      price: this.vehicles[index].price,
      made_in: this.vehicles[index].made_in,
      service_type: this.vehicles[index].service_type,
      made_year: this.vehicles[index].made_year,
      cc: this.vehicles[index].cc,
      tyers: this.vehicles[index].tyers,
      description: this.vehicles[index].description,
      _condition: this.vehicles[index]._condition,
      heavy_light: this.vehicles[index].heavy_light,
      load_type: this.vehicles[index].load_type
    }});
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
 
 }
 
 
 }
 
 