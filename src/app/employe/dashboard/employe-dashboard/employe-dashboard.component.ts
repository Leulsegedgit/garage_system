import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent implements OnInit {
  dashboard_content: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }
  sidenavcliked(sidenav:string){
    this.dashboard_content=sidenav;
   
  }
}
