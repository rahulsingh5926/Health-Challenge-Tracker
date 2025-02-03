import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-workout-progress',
  standalone: true,
  imports: [FormsModule, Listbox],
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.scss'],
})
export class WorkoutProgressComponent implements OnInit {
  cities: any[] = [];
  selectedCity!: any;
  
  @Output() userSelected = new EventEmitter<string>(); // Sends selected user to parent component

  ngOnInit() {
    this.loadNamesFromLocalStorage();
  }

  loadNamesFromLocalStorage() {
    const workoutDataString = localStorage.getItem('workouts');
    if (workoutDataString) {
      const workoutData = JSON.parse(workoutDataString);
      this.cities = workoutData.map((workout: any) => ({
        name: workout.userName, // Assuming workout object contains userName
        code: workout.userName, // Using name as unique code
      }));
    }
  }

  onUserSelect(user: City) {
    this.userSelected.emit(user.name); // Send selected user's name
    // if (this.selectedCity) {
    //   console.log('Selected USer', this.selectedCity);
    // }
  }
}
