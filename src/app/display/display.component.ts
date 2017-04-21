import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/pluck';
import { QA } from '../qa';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  
  qa:QA;

  constructor(private route: ActivatedRoute) { 
    route.data.pluck('qa')
        .subscribe(obj => this.qa = <QA>obj );
  }

  ngOnInit() {
  }

}
