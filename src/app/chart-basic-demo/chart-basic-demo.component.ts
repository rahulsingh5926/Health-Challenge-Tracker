// import { isPlatformBrowser } from '@angular/common';
// import { ChangeDetectorRef, Component, effect, inject, Input, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
// import { ChartModule } from 'primeng/chart';

// @Component({
//     selector: 'chart-basic-demo',
//     templateUrl: './chart-basic-demo.component.html',
//     standalone: true,
//     imports: [ChartModule]
// })
// export class ChartBasicDemoComponent implements OnInit {
//   @Input() selectedUser: string = ''; // Receives username from parent

//   userWorkouts: any;
//     basicData: any;

//     basicOptions: any;

//     platformId = inject(PLATFORM_ID);

//     constructor(private cd: ChangeDetectorRef) {}

//     ngOnInit() {
//         this.initChart();
//     }

//     initChart() {
//         if (isPlatformBrowser(this.platformId)) {
//             const documentStyle = getComputedStyle(document.documentElement);
//             const textColor = documentStyle.getPropertyValue('--p-text-color');
//             const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
//             const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
//             this.loadUserWorkouts();
//             console.log('Basic: ',this.basicData);
//             this.cd.markForCheck()
//         }
//     }

//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['selectedUser'] && this.selectedUser) {
//       this.loadUserWorkouts();
//     }
//   }
//   updateChart(userName: string) {  // <-- Ensure this function exists
//     console.log('Chart update called for:', userName);
//     this.selectedUser = userName;
//     this.loadUserWorkouts();
//   }

//   loadUserWorkouts() {
//     const workoutDataString = localStorage.getItem('workouts');
//     if (workoutDataString) {
//       const workoutData = JSON.parse(workoutDataString);
//       console.log('Selected: ',this.selectedUser);
//       const userWorkouts = workoutData.find((user: any) => user.userName === this.selectedUser);
//       console.log('Selected workout: ',userWorkouts);

//       if (userWorkouts) {
//         const labels = userWorkouts.workoutType;
//         const data = userWorkouts.workoutDuration;
//         console.log('data',data);
//         this.basicData = {
//           labels: labels,
//           datasets: [
//             {
//               label: `Activity Time for ${this.selectedUser}`,
//               data: data,
//               backgroundColor: 'rgb(188, 61, 61)',
//               borderColor: 'rgb(195, 214, 227)',
//               borderWidth: 1,
//             },
//           ],
//         };

//         console.log('Basic: ',this.basicData);
//       }
//     }
//   }

// }
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, Input, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'chart-basic-demo',
    templateUrl: './chart-basic-demo.component.html',
    standalone: true,
    imports: [ChartModule]
})
export class ChartBasicDemoComponent implements OnInit {
  @Input() selectedUser: string = ''; // Receives username from parent

  userWorkouts: any;
  basicData: any;
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
    const workoutDataString = localStorage.getItem('workouts');
    if (workoutDataString) {
      const workoutData = JSON.parse(workoutDataString);
      console.log('Selected: ', this.selectedUser);
      const userWorkouts = workoutData.find((user: any) => user.userName === this.selectedUser);
      console.log('Selected workout: ', userWorkouts);

      if (userWorkouts) {
        const labels = userWorkouts.workoutType;
        const data = userWorkouts.workoutDuration;
        console.log('data', data);
        this.basicData = {
          labels: labels,
          datasets: [
            {
              label: `Activity Time for ${this.selectedUser}`,
              data: data,
              backgroundColor: 'rgb(188, 61, 61)',
              borderColor: 'rgb(195, 214, 227)',
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