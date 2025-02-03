// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { ButtonModule } from 'primeng/button';
// @Component({
//   selector: 'app-add-workout',
//   standalone: true, // Mark the component as standalone
//   imports: [CommonModule, FormsModule,ButtonModule], // Import necessary modules
//   templateUrl: './add-workout.component.html',
//   styleUrls: ['./add-workout.component.css']
// })
// export class AddWorkoutComponent {
//   userName: string = '';
//   workoutType: string = '';
//   workoutMinutes: number = 0;

//  onSubmit() {
//   const workout = {
//     userName: this.userName,
//     workoutType: this.workoutType,
//     workoutMinutes: this.workoutMinutes,
//   };
 
//   alert(`Workout Added!\nUser: ${this.userName}\nWorkout: ${this.workoutType}\nMinutes: ${this.workoutMinutes}`);


//   // Get existing workouts from localStorage
//   const existingWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');

//   // Add new workout
//   existingWorkouts.push(workout);

//   // Save updated array to localStorage
//   localStorage.setItem('workouts', JSON.stringify(existingWorkouts));

//   console.log('Workout Added:', workout);
//   console.log('Stored Workouts:', localStorage.getItem('workouts')); // Debugging step
// }

// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent {
  userName: string = '';
  workouts: { workoutType: string; workoutMinutes: number }[] = [{ workoutType: '', workoutMinutes: 0 }];

  // Add a new workout entry
  addWorkout() {
    this.workouts.push({ workoutType: '', workoutMinutes: 0 });
  }

  // Remove a specific workout entry
  removeWorkout(index: number) {
    this.workouts.splice(index, 1);
  }

  onSubmit() {
    if (!this.userName.trim()) {
      alert('Please enter a valid username.');
      return;
    }

    const userWorkouts = {
      userName: this.userName,
      activities: this.workouts.filter(workout => workout.workoutType && workout.workoutMinutes > 0),
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

    alert(`Workout Added for ${this.userName}!`);
    console.log('Workout Added:', userWorkouts);
  }
}
