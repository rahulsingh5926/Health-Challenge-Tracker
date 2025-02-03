import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  
  saveWorkout(userName: string, workouts: { workoutType: string; workoutMinutes: number }[]) {
    if (!userName.trim()) {
      alert('Please enter a valid username.');
      return;
    }

    const userWorkouts = {
      userName: userName,
      activities: workouts.filter(workout => workout.workoutType && workout.workoutMinutes > 0),
    };

    if (userWorkouts.activities.length === 0) {
      alert('Please add at least one valid workout.');
      return;
    }

    // Get existing workouts from localStorage
    const existingWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');

    // Add new workouts
    existingWorkouts.push(userWorkouts);

    // Save updated array to localStorage
    localStorage.setItem('workouts', JSON.stringify(existingWorkouts));

    alert(`Workout Added for ${userName}!`);
    console.log('Workout Added:', userWorkouts);
  }
}
