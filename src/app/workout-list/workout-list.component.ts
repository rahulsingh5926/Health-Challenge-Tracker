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
  customers: any[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    const workoutDataString = localStorage.getItem('workouts');
    if (workoutDataString) {
      this.customers = JSON.parse(workoutDataString);
    }
  }

  get filteredCustomers() {
    return this.customers.filter(customer => 
      customer.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  deleteCustomer(customerIndex: number) {
    this.customers.splice(customerIndex, 1);
    localStorage.setItem('workouts', JSON.stringify(this.customers));
  }
   getTotalMinutes(activities: any[]) {
    return activities.reduce((total, activity) => total + activity.workoutMinutes, 0);
  }
}