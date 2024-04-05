import { Component, OnInit, inject } from '@angular/core';
import { SpidersService } from '../spiders.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SpiderModel } from '../spider-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { SpiderHistoryDialog } from './components/spider-history-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { forkJoin } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-list-spiders',
  templateUrl: './list-spiders.component.html',
  standalone: true,
  imports: [
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class ListSpidersComponent implements OnInit {
  private _service = inject(SpidersService);
  spiders: SpiderModel[] = [];
  projectName: string | null = null;
  icon = 'remove';
  filters: string = 'all';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectName = params['name'];
      if (this.projectName) {
        this.getJobs();
      }
    });
  }

  runSpider() {
    const loops = this.selectedSpiders.map((e) =>
      this._service.runSpider(this.projectName!, e)
    );

    forkJoin(loops).subscribe({
      next: (response) => {
        const successCount = response.map((e) => e.status == 'ok').length;
        console.log(
          `Successfully started ${successCount} spiders of ${response.length}`
        );
        this.getJobs();
      },
      error: (err) => {
        console.log({ err });
      },
    });
  }

  getJobs() {
    const projectName = this.projectName!;
    this._service.getJobs(projectName).subscribe({
      next: (response) => {
        if (response.status == 'ok') {
          const { status, node_name, ...data } = response;
          const parsedData = Object.keys(data).reduce((res, key) => {
            data[key as keyof typeof data].reduce((a, b) => {
              if (b.spider in res) {
                if (key in res[b.spider]) {
                  res[b.spider][key].push(b);
                } else {
                  res[b.spider][key] = [b];
                }
              } else {
                res[b.spider] = {
                  [key]: [b],
                };
              }
              return a;
            }, {} as any);
            return res;
          }, {} as any);
          this._service.getSpiders(projectName).subscribe({
            next: (response) => {
              if (response.status == 'ok') {
                this.spiders = response.spiders.map((spiderName) => {
                  return {
                    name: spiderName,
                    pending: parsedData[spiderName]?.pending ?? [],
                    running: parsedData[spiderName]?.running ?? [],
                    finished: parsedData[spiderName]?.finished ?? [],
                    selected: false,
                  };
                });
              }
            },
            error: (error) => {
              console.log({ error });
            },
          });
        }
      },
      error: (err) => {
        console.log({ err });
      },
    });
  }

  showHistory(index: number) {
    this.dialog.open(SpiderHistoryDialog, {
      data: this.spiders[index].finished,
    });
  }
  showLogs() {}
  backToProjects() {
    console.log('here');
    this.router.navigate(['/']);
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete =
      this.spiders != null && this.spiders.every((t) => t.selected);
  }

  someComplete(): boolean {
    if (this.spiders == null) {
      return false;
    }
    return (
      this.spiders.filter((t) => t.selected).length > 0 && !this.allComplete
    );
  }

  setAll(selected: boolean) {
    this.allComplete = selected;
    if (this.spiders == null) {
      return;
    }
    this.spiders.forEach((t) => (t.selected = selected));
  }

  get selectedSpiders() {
    return this.spiders.filter((t) => t.selected).map((e) => e.name);
  }
}
