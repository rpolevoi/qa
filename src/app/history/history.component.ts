import { Component, OnInit } from '@angular/core';
import { ViewedQA } from '../qa';
import { QAService } from '../qa.service';
import { UserService } from '../user.service';
import { HistoryService } from '../history.service';


@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  selectedFilter = 'View All';

  filters = [
    'View All',
    'Bookmarked Only',
    'Answer Not Viewed'
  ];

  fullHistory: ViewedQA[];
  filtered: ViewedQA[];
  loggedIn:boolean;


  constructor(
              private qaServ: QAService,
              private userServ: UserService,
              private historyServ: HistoryService
              )
              { this.loggedIn = this.userServ.isLoggedIn;}


  ngOnInit() {
    
    this.historyServ.viewedQAList$
                .first()
                .subscribe(list => {
                    this.fullHistory = list.reverse();
                    this.applyFilter('View All');
                 });
    
  }
  


  applyFilter(filt:string) {

    switch (filt)
    {
      case 'View All':
        this.filtered = this.fullHistory;
        break;
        
      case 'Bookmarked Only':
        this.filtered = this.fullHistory.filter(el => el.bookmark == true);
        break;
        
      case 'Answer Not Viewed':
        this.filtered = this.fullHistory.filter(el => el.qOnly == true);
        break;
        
      default:
        console.log('defaulted -- somthing wrong');
    
    }
  }
  

  
}
