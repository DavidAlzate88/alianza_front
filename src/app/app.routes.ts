import { Routes } from '@angular/router';
import {ClientsComponent} from "./components/clients/list/clients.component";

export const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    title: 'Home page',
  },
  // {
  //   path: 'details/:id',
  //   component: DetailsComponent,
  //   title: 'Home details',
  // },
];
