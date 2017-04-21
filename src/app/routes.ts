import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { QAService } from './qa.service';

export const routes: Routes = [
  {
    path: '',
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
    path: '**',
    component: HomeComponent
  }
  
];