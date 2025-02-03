import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

interface WorkoutActivity {
  workoutType: string;
  workoutMinutes: number;
}

interface UserWorkout {
  userName: string;
  activities: WorkoutActivity[];
}

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnInit {
  person: UserWorkout[] = [];
  searchTerm: string = '';
  selectedActivity: string = '';
  activityTypes: string[] = ['Yoga', 'Running', 'Swimming', 'Cycling'];

  ngOnInit() {
    this.loadWorkouts();
  }

loadWorkouts() {
  if (typeof window !== 'undefined') {
    const workoutDataString: string | null = localStorage.getItem('workouts');
    if (workoutDataString) {
      this.person = JSON.parse(workoutDataString) as UserWorkout[];
    }
  }
}


  get filteredperson(): UserWorkout[] {
    return this.person.filter((person) =>
      person.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedActivity === '' ||
        person.activities.some((activity: WorkoutActivity) => activity.workoutType === this.selectedActivity))
    );
  }

  deleteperson(personIndex: number) {
    this.person.splice(personIndex, 1);
    localStorage.setItem('workouts', JSON.stringify(this.person));
  }

  getTotalMinutes(activities: WorkoutActivity[]): number {
    return activities.reduce((total, activity) => total + activity.workoutMinutes, 0);
  }
}
