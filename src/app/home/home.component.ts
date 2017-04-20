import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QAService } from '../qa.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private qaServ: QAService) { }

  ngOnInit() {
  }
  
  toDisplay() {
    this.router.navigate(['display']);
  }

}
