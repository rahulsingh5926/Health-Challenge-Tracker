import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutProgressComponent } from './workout-progress/workout-progress.component';

const routes: Routes = [
  { path: 'add-workout', component: AddWorkoutComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  { path: 'workout-progress', component: WorkoutProgressComponent },
  { path: '', redirectTo: '/workout-list', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/workout-list' } // Fallback route for invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }