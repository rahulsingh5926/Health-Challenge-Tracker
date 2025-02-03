import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';

interface WorkoutActivity {
  workoutType: string;
  workoutMinutes: number;
}

interface UserWorkout {
  userName: string;
  activities: WorkoutActivity[];
}

@Component({
  selector: 'chart-basic-demo',
  templateUrl: './chart-basic-demo.component.html',
  standalone: true,
  imports: [ChartModule]
})
export class ChartBasicDemoComponent implements OnInit {
  @Input() selectedUser: string = ''; // Receives username from parent

  userWorkouts: UserWorkout | undefined;
  basicData: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string; borderColor: string; borderWidth: number }[] } | undefined;
  basicOptions: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };

      this.loadUserWorkouts();
      this.cd.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser'] && this.selectedUser) {
      this.loadUserWorkouts();
    }
  }

  updateChart(userName: string) {
    console.log('Chart update called for:', userName);
    this.selectedUser = userName;
    this.loadUserWorkouts();
  }

  loadUserWorkouts() {
    const workoutDataString: string | null = localStorage.getItem('workouts');
    if (workoutDataString) {
      const workoutData: UserWorkout[] = JSON.parse(workoutDataString);
      console.log('Selected: ', this.selectedUser);

      const userWorkouts: UserWorkout | undefined = workoutData.find((user: UserWorkout) => user.userName === this.selectedUser);
      console.log('Selected workout: ', userWorkouts);

      if (userWorkouts && userWorkouts.activities) {
        const labels: string[] = userWorkouts.activities.map((activity: WorkoutActivity) => activity.workoutType);
        const data: number[] = userWorkouts.activities.map((activity: WorkoutActivity) => activity.workoutMinutes);
        console.log('data', data);

        this.basicData = {
          labels: labels,
          datasets: [
            {
              label: `Activity Time for ${this.selectedUser}`,
              data: data,
              backgroundColor: 'rgb(35, 203, 141)',
              borderColor: 'rgb(245, 249, 252)',
              borderWidth: 1,
            },
          ],
        };

        console.log('Basic: ', this.basicData);
        this.cd.markForCheck();
      }
    }
  }
}
