import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReceptionService } from 'src/app/services/reception.service';

@Component({
  selector: 'app-reception-edit',
  templateUrl: './reception-edit.component.html',
  styleUrls: ['./reception-edit.component.css']
})
export class ReceptionEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private reception_service:ReceptionService) { }
  
  ngOnInit(): void {
  }
  updateReception(reception:any,no:number){
    reception.no= no;
    reception.damage = this.data.damage;
    reception.status = this.data.status;
    reception.service_type = this.data.service_type;
    this.reception_service.updateReception(reception);
  }
}
