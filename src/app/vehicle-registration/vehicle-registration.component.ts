import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpareRegistrationEditComponent } from '../dialog/spare-registration-edit/spare-registration-edit.component';
import { VehicleService } from '../services/vehicle.service';

export interface vehicle {
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
   { no: 1, part_number: '66-GH-34', part_name: 'CABLE', unit_measure: 'SET', vehicle_type: 'TOYOTA', unit_price: '949', store_number: 4, part_type: 'break system',
    location: '15C', class_type: 'A', heavy_light: 'LIGHT', consumable: 'NON CONSUMABLE', description: 'fRAIN CABLE', date: '23-10-2022'}
];

  displayedColumns: string[] = ['no','part_number','part_name','unit_measure', 'vehicle_type',  'store_number','part_type','location','unit_price','class_type','heavy_light','consumable','description','edit','delete'];
  dataSource = this.spares;
  getVehicle(param:vehicle){

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
 
 
 }
 
 