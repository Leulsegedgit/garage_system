import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable,startWith } from 'rxjs';
import { SpareRegistrationEditComponent } from '../dialog/spare-registration-edit/spare-registration-edit.component';
import { HelperFunctionsService } from '../services/helper-functions.service';
import { PrintService } from '../services/print.service';
import { ReceptionService } from '../services/reception.service';

export interface reception {
  no: number;
  service_number: string;
  plate_number: string;
  refference: string;
  date_received: string;
  date_finished: string;
  service_type: string;
  status: string;
  fuel_gauge: string;
  damage: string;
  other: string;
  
}

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {
  print = false;

  constructor(private _reception: ReceptionService, private _helper:HelperFunctionsService,public dialog: MatDialog, public _router: Router,
    public print_service:PrintService) { }

  myControl = new FormControl();
  filteredNames: Observable<string[]> | undefined;

public dashboard_content = "home";
  ngOnInit(): void {
    this._reception.updaterow$.subscribe(
      row => {
        console.log(row);
  console.log(row.no);
  
  this.receptions[row.no-1] = row;
  this.dataSource = this.receptions;
  this.deleteReception('0');
      }
    );
    this._reception.RefreashRequired.subscribe(
      response=>{
        
        this.deleteReception('0');
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
  names: string[] = ['AA-1234','AM-3456','OR-789','DW-01278'];
  getNames(starting:any){
    let names:any = []
    console.log(starting)
    this._helper.getPlateNumber(starting).subscribe(
        (data:any)=>{
          console.log(data)
          names = data;
          if(data.length > 0)
          for(let i=0; i<names.length; i++){
            this.names[i]=names[i].name
            
          }
         
        }
      )
  }
  
  public receptions:reception[] = [
    { no: 1, service_number: '66-GH-34', plate_number: 'AA-1234', refference: 'REF34892', date_received: '22-11-2022', date_finished: '29-11-2022', service_type: "4", status: 'Finished',
    fuel_gauge: '4.5', damage: 'Dead battery', other: 'Paint scratch'} ];

 displayedColumns: string[] = ['no','service_number','plate_number','refference', 'date_received',  'date_finished','service_type','status','fuel_gauge','damage','other','edit','delete'];
 dataSource = this.receptions;

  getReception(param:reception){

    this._reception.getReception(param).subscribe(
      (data)=>{
        
       this.receptions = data;
        for(let i=0; i<this.receptions.length; i++){
          this.receptions[i].no = i+1;
        }
        this.dataSource = this.receptions;
       
      }
    )
  }
  addReception(param:any){
    let d = ""
        for(let i=0;i<param.damage.length;i++){
          d+=param.damage[i]+" "
        }
        param.damage = d;
   this._reception.addReception(param).subscribe(
      (data)=>{
       
        param.no = this.receptions.length+1;
        this.receptions.push(param);
          this.dataSource = this.receptions;
       
      }
    )
    
  }
  deleteReception(param:string){
    this._reception.deleteReception(param).subscribe(
      (data)=>{
        this.receptions = this.receptions.filter(function(el) { return el.service_number != param; }); 
        this.dataSource = this.receptions;   
      }
    )
  }
  
 
  openDialog(row:any): void {
    let index = row-1;
    
    const dialogRef = this.dialog.open(SpareRegistrationEditComponent,{data: {
      no: this.receptions[index].no,
      service_number: this.receptions[index].service_number,
      plate_number: this.receptions[index].plate_number,
      refference: this.receptions[index].refference,
      date_received: this.receptions[index].date_received,
      date_finished: this.receptions[index].date_finished,
      service_type: this.receptions[index].service_type,
      status: this.receptions[index].status,
      fuel_gauge: this.receptions[index].fuel_gauge,
      damage: this.receptions[index].damage,
      other: this.receptions[index].other,
      
    }});
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
 
 }
 
 printData(){
this.print_service.setReceptions(this.receptions)
  this._router.navigate(['/print']);
  // this.print = true;
  // window.print()
}


 }
 
 