import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { FinishedJob } from '../../spider-response.interface';

@Component({
  templateUrl: './spider-history-dialog.component.html',
  standalone: true,
  imports: [SharedModule, MatDialogModule, MatButtonModule],
})
export class SpiderHistoryDialog implements OnInit {
  history: FinishedJob[];
  constructor(
    private dialogRef: MatDialogRef<SpiderHistoryDialog>,
    @Inject(MAT_DIALOG_DATA) history: FinishedJob[] = []
  ) {
    this.history = history;
  }
  ngOnInit() {}
  close() {
    this.dialogRef.close();
  }
  openItems() {}
  openLogs() {}
  getDataDiff(startDate: string, endDate: string) {
    const diff = new Date(startDate).getTime() - new Date(endDate).getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    var minutes =
      Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
      const seconds =
      Math.floor(diff / 1000) -
      (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
    return `${days ? `${days} Dias, ` : ''}${hours ? `${hours} Horas, ` : ''}${minutes ? `${minutes} Minutos, ` : ''}${seconds ? `${seconds} Segundos.` : ''}`
  }
}
