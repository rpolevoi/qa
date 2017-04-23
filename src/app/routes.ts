import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { HistoryComponent } from './history/history.component';
import { QAService } from './qa.service';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'display/:id',
    component: DisplayComponent,
        resolve: {
      qa: QAService
    }
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: '**',
    component: HomeComponent
  }
  
];