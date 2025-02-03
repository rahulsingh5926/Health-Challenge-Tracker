import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { WorkoutProgressComponent } from '../workout-progress/workout-progress.component';
import { ChartBasicDemoComponent } from '../chart-basic-demo/chart-basic-demo.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [WorkoutProgressComponent, ChartBasicDemoComponent],
})
export class MainComponent implements AfterViewInit {
  selectedUser: string = '';
  @ViewChild(ChartBasicDemoComponent) chart!: ChartBasicDemoComponent;

  ngAfterViewInit() {
    console.log('Chart component initialized:', this.chart);
  }

  onUserSelected(userName: string) {
    if (this.chart) {
      this.selectedUser = userName;
      console.log('Updating chart for:', userName);
      this.chart.updateChart(userName);
    } else {
      console.warn('Chart component is not initialized yet.');
    }
  }
}
