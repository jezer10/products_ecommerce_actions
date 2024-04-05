import { Routes } from '@angular/router';
import { ListSpidersComponent } from './spiders/list/list-spiders.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: 'projects/:name',
    component: ListSpidersComponent,
  },
];
