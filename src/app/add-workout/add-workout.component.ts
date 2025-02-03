import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { WorkoutService } from '../services/workout.service'; // Import Service

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-workout.component.html',
  
})
export class AddWorkoutComponent {
  userName: string = '';
  workouts: { workoutType: string; workoutMinutes: number }[] = [{ workoutType: '', workoutMinutes: 0 }];

  constructor(private workoutService: WorkoutService) {} // Inject Service

  addWorkout() {
    this.workouts.push({ workoutType: '', workoutMinutes: 0 });
  }

  removeWorkout(index: number) {
    this.workouts.splice(index, 1);
  }

  onSubmit() {
    this.workoutService.saveWorkout(this.userName, this.workouts); // Call Service
  }
}
