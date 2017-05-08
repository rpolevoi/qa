import { Component, OnInit } from '@angular/core';
import { ViewedQA } from '../qa';
import { QAService } from '../qa.service';
import { UserService } from '../user.service';


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


  constructor(private qaServ: QAService, private userServ: UserService) { 
    this.loggedIn = this.userServ.isLoggedIn;
  }

  ngOnInit() {
    
    this.getCurrentList();
    this.applyFilter('View All');
    
  }
  
  getCurrentList() {
    
      this.fullHistory = this.qaServ.viewedQAList.slice(0);
      this.fullHistory.reverse();

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
