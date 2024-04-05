import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import {
  ListJobResponse,
  ListProjectResponse,
  ListProjectVersionResponse,
  ListSpiderResponse,
  RunSpiderResponse,
} from './spider-response.interface';
@Injectable({
  providedIn: 'root',
})
export class SpidersService {
  constructor(private http: HttpClient) {}
  getSpiders(projectName: string): Observable<ListSpiderResponse> {
    return this.http.get<ListSpiderResponse>(
      `${environment.base}/listspiders.json`,
      { params: { project: projectName } }
    );
  }
  getJobs(projectName: string): Observable<ListJobResponse> {
    return this.http.get<ListJobResponse>(`${environment.base}/listjobs.json`, {
      params: {
        project: projectName,
      },
    });
  }

  getProjects(): Observable<ListProjectResponse> {
    return this.http.get<ListProjectResponse>(
      `${environment.base}/listprojects.json`
    );
  }
  getProjectVersions(
    projectName: string
  ): Observable<ListProjectVersionResponse> {
    return this.http.get<ListProjectVersionResponse>(
      `${environment.base}/listversions.json`,
      {
        params: {
          project: projectName,
        },
      }
    );
  }

  deleteProjectVersion(projectName: string, version: string): Observable<any> {
    const body = new URLSearchParams({
      project: projectName,
      version: version,
    });
    return this.http.post(`${environment.base}/delversion.json`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
  deleteProject(projectName: string): Observable<any> {
    const body = new URLSearchParams({
      project: projectName,
    });
    return this.http.post(`${environment.base}/delproject.json`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
  runSpider(
    projectName: string,
    spiderName: string
  ): Observable<RunSpiderResponse> {
    let body = new URLSearchParams({
      project: projectName,
      spider: spiderName,
    });
    return this.http.post<RunSpiderResponse>(
      `${environment.base}/schedule.json`,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }
}
