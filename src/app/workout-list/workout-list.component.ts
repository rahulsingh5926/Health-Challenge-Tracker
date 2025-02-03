import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent {
  person: any[] = [];
  searchTerm: string = '';
  selectedActivity: string = '';
  activityTypes: string[] = ['Yoga', 'Running', 'Swimming', 'Cycling'];

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    const workoutDataString = localStorage.getItem('workouts');
    if (workoutDataString) {
      this.person = JSON.parse(workoutDataString);
    }
  }

  get filteredperson() {
    return this.person.filter(person => 
      person.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedActivity === '' || person.activities.some((activity: any) => activity.workoutType === this.selectedActivity))
    );
  }

  deleteperson(personIndex: number) {
    this.person.splice(personIndex, 1);
    localStorage.setItem('workouts', JSON.stringify(this.person));
  }

  getTotalMinutes(activities: any[]) {
    return activities.reduce((total, activity) => total + activity.workoutMinutes, 0);
  }
}
