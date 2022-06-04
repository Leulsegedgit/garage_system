import { Component, OnInit } from '@angular/core';
import { TechnicianService } from '../services/technician.service';


export interface technician {
  no: number;
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: number;
  major: string;
  level: string;
  date: string;
}

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {
  constructor(private _technician:TechnicianService) { 

  }

  ngOnInit(): void {
    this._technician.RefreashRequired.subscribe(
      response=>{
        this.getTechinician(this.techinicians[0]);
      }
    )
  }

  public techinicians:technician[] = [
    {no: 1, id: 1234 , first_name: 'FikreMariam' , middle_name: 'Yohannes',last_name: 'Bishaw',phone_number: 251933472757,major: 'body',level: 'beginner',date: '12-02-2014'},
    {no: 2, id: 1234 , first_name: 'Kassu' , middle_name: 'Jilcha',last_name: 'Getachew',phone_number: 251974967497,level: 'expert',major: 'enegin', date: '12-02-2014'},
    {no: 3, id: 1234 , first_name: 'Kassu' , middle_name: 'Jilcha',last_name: 'Getachew',phone_number: 251934748573,level: 'expert',major: 'electric' , date: '12-02-2014'},
     
  ];
  displayedColumns: string[] = ['no','id', 'first_name', 'middle_name', 'last_name','phone_number','major','level','date','action'];
  dataSource = this.techinicians;
  getTechinician(param:technician){
    this._technician.getTechinician(param).subscribe(
      (data)=>{
        console.log(data[0]);
        this.techinicians = data;
        this.dataSource = this.techinicians;
      }
    )
  }
  addTechinician(param:technician){
    this._technician.addTechinician(param).subscribe(
      (data)=>{
          this.techinicians.push(param);
       this.dataSource = this.techinicians;
       
      }
    )
    
  }
  deleteTechinician(param:number){
    console.log(param)
    this._technician.deleteTechinician(param).subscribe(
      (data)=>{
        console.log(this.techinicians);
         this.techinicians = this.techinicians.filter(function(el) { return el.id != param; }); 

         this.dataSource = this.techinicians;   
      }
    )
  }
}
