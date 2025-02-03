import { Routes } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: 'add-workout', component: AddWorkoutComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  { path: 'workout-progress', component: MainComponent },
  { path: '', redirectTo: '/workout-list', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/workout-list' } // Fallback route for invalid paths
];