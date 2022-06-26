import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreServiceService } from 'src/app/services/store-service.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _vehicle_service:VehicleService) { }
  
  ngOnInit(): void {
  }
  updateVehicle(vehicle:any,no:number){
    vehicle.no= no;
    vehicle.fuel_type = this.data.fuel_type
    vehicle.factory = this.data.factory
    vehicle.made_in = this.data.made_in
    vehicle.service_type = this.data.service_type
    vehicle.made_year = this.data.made_year
    vehicle._condition = this.data._condition
    vehicle.heavy_light = this.data.heavy_light
    vehicle.load_type = this.data.load_type
   this._vehicle_service.updateVehicle(vehicle);
  }
}
