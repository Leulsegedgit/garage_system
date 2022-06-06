import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpareRegistrationEditComponent } from 'src/app/dialog/spare-registration-edit/spare-registration-edit.component';
import { EmployeService } from 'src/app/services/employe.service';

export interface employe {
  no: number;
  employe_id: string;
  name: string;
  gender: string;
  profession: string;
  responsiblity: string;
  department: string;
  diractorate: string;
  division: string;
  mastebaberiya: string;
  team: string;
  education_level: string;
  type: string;
  salary: number;
  birth_date: string;
  hire_date: string;
}

@Component({
  selector: 'app-employe-registration',
  templateUrl: './employe-registration.component.html',
  styleUrls: ['./employe-registration.component.css']
})
export class EmployeRegistrationComponent implements OnInit {

  
  constructor(private _employe:EmployeService,public dialog: MatDialog) { 

  }
 
  ngOnInit(): void {
    
    this._employe.updaterow$.subscribe(
      row => {
        
  
  this.employees[row.no-1] = row;
  this.dataSource = this.employees;
  this.deleteEmploye('0');
      }
    );
    this._employe.RefreashRequired.subscribe(
      response=>{
        
        this.deleteEmploye('0');
      }
    );
  }
 
  public employees:employe[] = [
    {
       no: 1, employe_id: 'EMP-123', name: 'Yohannes Teklie', gender: 'MALE', profession: 'DRIVER', responsiblity: 'RES', department: 'A', diractorate: 'B',
  division: 'C', mastebaberiya: 'D', team: 'L', education_level: 'Degree', type: 'A', salary: 9786.65, birth_date: '12-08-94',hire_date: '22-10-19'
}
];

  displayedColumns: string[] = ['no','employe_id','name','proffesion', 'vehicle_type', 'unit_price', 'store_number','part_type','unit_price','class_type','heavy_light','consumable','description','edit','delete'];
  dataSource = this.employees;
  getEmploye(param:employe){
    this._employe.getEmploye(param).subscribe(
      (data)=>{
       this.employees = data;
        for(let i=0; i<this.employees.length; i++){
          this.employees[i].no = i+1;
        }
        this.dataSource = this.employees;
      }
    )
  }
  addEmploye(param:employe){
    this._employe.addEmploye(param).subscribe(
      (data)=>{
        
        param.no = this.employees.length+1;
        this.employees.push(param);
          this.dataSource = this.employees;
       
      }
    )
    
  }
  deleteEmploye(param:string){
    this._employe.deleteEmploye(param).subscribe(
      (data)=>{
        this.employees = this.employees.filter(function(el) { return el.employe_id != param; }); 
        this.dataSource = this.employees;   
      }
    )
  }
  
 
  openDialog(row:any): void {
    let index = row-1;
    
    const dialogRef = this.dialog.open(SpareRegistrationEditComponent,{data: {
      no: this.employees[index].no,
      employe_id: this.employees[index].employe_id,
      name: this.employees[index].name,
      gender: this.employees[index].gender,
      profession: this.employees[index].profession,
      responsiblity: this.employees[index].responsiblity,
      department: this.employees[index].department,
      diractorate: this.employees[index].diractorate,
      division: this.employees[index].division,
      mastebaberiya: this.employees[index].mastebaberiya,
      team: this.employees[index].team,
      education_level: this.employees[index].education_level,
      type: this.employees[index].type,
      salary: this.employees[index].salary,
      birth_date: this.employees[index].birth_date,
      hire_date: this.employees[index].hire_date,
    }});
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
 
 }
 
 
 }
 
 