import { Component, OnInit } from '@angular/core';
import { driver, DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  public drivers:driver[] = [
    {id: 1, first_name: "Abrham" , middle_name: "Wubet" , last_name: "Bayleyegn",phone_number: '25145678297',address: "Ethiopia",city: "Adis Ababa",state: "5 kilo",date: "2022-5-11"},
    {id: 2, first_name: "Ermias" , middle_name: "Kelemwork" , last_name: "Ketsela",phone_number: '251037415017',address: "Ethiopia",city: "Bahirdar",state: "poly",date: "2022-5-11"},
  ];
  constructor(private _driver : DriverService) { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['id', 'first_name', 'middle_name', 'last_name','phone_number','address','city','state','date'];
  driversdataSource = this.drivers;
  getDriver(param:driver){
    console.log(12345)
    console.log(param)
    this._driver.getDriver(param).subscribe(
      (data)=>{
        this.drivers = data;
        this.driversdataSource = this.drivers;
        console.log(this.drivers)
      }
    )
  }

  addDriver(param:driver){
    this._driver.addDriver(param).subscribe(
      (data)=>{
        
        this.drivers.push(param);
              }
    )
  }
}
