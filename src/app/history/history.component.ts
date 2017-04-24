import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from "rxjs";
import { ViewedQA } from '../qa';
import { QAService } from '../qa.service';
import 'rxjs/add/operator/first';


@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  //filteredList$: Observable<ViewedQA[]>
  //viewedList$: FirebaseListObservable<ViewedQA>;
  fullHistory: ViewedQA[];
  bookmarkFiltered: ViewedQA[];
  bookmarkFilter = false;

  constructor(private qaServ: QAService) {
    //this.viewedList$ = this.qaServ.viewedQAList$

    
  }

  ngOnInit() {
    
    this.qaServ.viewedQAList$
      .first()
      .subscribe(list => {
          this.fullHistory = list;
          this.bookmarkFiltered = this.fullHistory.filter(el => el.bookmark == true);
      });
  }

}
