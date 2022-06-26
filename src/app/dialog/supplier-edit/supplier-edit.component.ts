import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierService } from 'src/app/services/supplier.service';
import { supplier } from 'src/app/supplier/supplier.component';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _supplier_service:SupplierService) { }
  
  ngOnInit(): void {
  }
  updateSupplier(supplier:supplier,no:number){
    supplier.no= no;
    supplier.date = this.data.date
    this._supplier_service.updateSupplier(supplier);
  }
}
