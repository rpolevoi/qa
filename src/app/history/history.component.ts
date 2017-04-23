import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ViewedQA } from '../qa';
import { QAService } from '../qa.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  viewedList$: FirebaseListObservable<ViewedQA>;

  constructor(private qaServ: QAService) {
    this.viewedList$ = this.qaServ.viewedQAList$
    
  }

  ngOnInit() {
  }

}
