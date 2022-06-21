import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-employe-registration-edit',
  templateUrl: './employe-registration-edit.component.html',
  styleUrls: ['./employe-registration-edit.component.css']
})
export class EmployeRegistrationEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _store_service:EmployeService) { }
  
  ngOnInit(): void {
  }
  updateEmployeRegistration(employe:any,no:number){
    employe.no= no;
    this._store_service.updateEmploye(employe);
  }

}
