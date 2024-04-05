import { Component, OnInit, inject } from '@angular/core';
import { SpidersService } from '../spiders/spiders.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class ProjectsComponent implements OnInit {
  projects: string[] = [];
  private _service = inject(SpidersService);
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._service.getProjects().subscribe({
      next: (response) => {
        if (response.status == 'ok') {
          this.projects = response.projects;
        }
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }

  showSpiders(projectName: string) {
    console.log(projectName);
    this.router.navigate(['projects', projectName]);
  }
}
