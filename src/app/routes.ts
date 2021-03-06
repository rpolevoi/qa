import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { HistoryComponent } from './history/history.component';
import { OfficeComponent } from './office/office.component';
import { QAService } from './qa.service';
import { AuthGuard } from './auth-guard.service';
import { ResolverService } from './resolver.service';


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
      qa: ResolverService
    }
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard]
  },
 
  {
  path: 'office',
    component: OfficeComponent,
  },
  
  {
    path: '**',
    component: HomeComponent
  }
  
];