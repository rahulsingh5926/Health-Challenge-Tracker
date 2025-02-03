import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

interface User {
  name: string;
  code: string;
}

interface WorkoutActivity {
  workoutType: string;
  workoutMinutes: number;
}

interface UserWorkout {
  userName: string;
  activities: WorkoutActivity[];
}

@Component({
  selector: 'app-workout-progress',
  standalone: true,
  imports: [FormsModule, Listbox],
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.scss'],
})
export class WorkoutProgressComponent implements OnInit {
  person: User[] = [];
  selectedPerson!: User;

  @Output() userSelected = new EventEmitter<string>(); // Sends selected user to parent component

  ngOnInit() {
    this.loadNamesFromLocalStorage();
  }

  loadNamesFromLocalStorage() {
    const workoutDataString: string | null = localStorage.getItem('workouts');
    if (workoutDataString) {
      const workoutData: UserWorkout[] = JSON.parse(workoutDataString);
      this.person = workoutData.map((workout: UserWorkout) => ({
        name: workout.userName, // Assuming workout object contains userName
        code: workout.userName, // Using name as unique code
      }));
    }
  }

  onUserSelect(user: User) {
    this.userSelected.emit(user.name); // Send selected user's name
  }
}
