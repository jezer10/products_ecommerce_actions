export interface SpiderModel {
  name: string;
  selected: boolean;
  pending: PendingJob[];
  running: RunningJob[];
  finished: FinishedJob[];
}

export interface ListSpiderResponse {
  node_name: string;
  status: string;
  spiders: string[];
}

export interface RunSpiderResponse {
  node_name: string;
  status: string;
  jobid?: string;
  message?: string;
}

export interface ListJobResponse {
  node_name: string;
  status: string;
  pending: PendingJob[];
  running: RunningJob[];
  finished: FinishedJob[];
}

interface PendingJob {
  project: string;
  spider: string;
  id: string;
}

interface RunningJob {
  id: string;
  project: string;
  spider: string;
  start_time: string;
}

export interface FinishedJob {
  id: string;
  project: string;
  spider: string;
  start_time: string;
  end_time: string;
  log_url: string;
  items_url: string;
}

export interface ListProjectResponse {
  status: string;
  projects: string[];
}
export interface ListProjectVersionResponse {
  status: string;
  versions: string[];
}
