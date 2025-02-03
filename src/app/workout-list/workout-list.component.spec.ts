import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, TableModule],
  
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load workouts from localStorage', () => {
    const mockWorkouts = [
      {
        userName: 'Alice',
        activities: [{ workoutType: 'Running', workoutMinutes: 30 }],
      },
      {
        userName: 'Bob',
        activities: [{ workoutType: 'Swimming', workoutMinutes: 45 }],
      },
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockWorkouts));

    component.loadWorkouts();
    expect(component.person.length).toBe(2);
    expect(component.person[0].userName).toBe('Alice');
    expect(component.person[1].activities[0].workoutType).toBe('Swimming');
  });

  it('should filter persons by search term', () => {
    component.person = [
      { userName: 'Alice', activities: [{ workoutType: 'Running', workoutMinutes: 30 }] },
      { userName: 'Bob', activities: [{ workoutType: 'Swimming', workoutMinutes: 45 }] },
    ];
    component.searchTerm = 'Alice';
    expect(component.filteredperson.length).toBe(1);
    expect(component.filteredperson[0].userName).toBe('Alice');
  });

  it('should filter persons by selected activity', () => {
    component.person = [
      { userName: 'Alice', activities: [{ workoutType: 'Running', workoutMinutes: 30 }] },
      { userName: 'Bob', activities: [{ workoutType: 'Swimming', workoutMinutes: 45 }] },
    ];
    component.selectedActivity = 'Swimming';
    expect(component.filteredperson.length).toBe(1);
    expect(component.filteredperson[0].userName).toBe('Bob');
  });

  it('should return total workout minutes for a user', () => {
    const activities = [
      { workoutType: 'Running', workoutMinutes: 30 },
      { workoutType: 'Cycling', workoutMinutes: 20 },
    ];
    expect(component.getTotalMinutes(activities)).toBe(50);
  });

it('should delete a person from the workout list and update localStorage', () => {
  const mockWorkouts = [
    { userName: 'Alice', activities: [{ workoutType: 'Running', workoutMinutes: 30 }] },
    { userName: 'Bob', activities: [{ workoutType: 'Swimming', workoutMinutes: 45 }] },
  ];
  component.person = [...mockWorkouts];
  spyOn(localStorage, 'setItem');

  component.deleteperson(0); // Deleting Alice (index 0)

  expect(component.person.length).toBe(1);
  expect(component.person[0].userName).toBe('Bob'); // Bob should still be present

  expect(localStorage.setItem).toHaveBeenCalledWith('workouts', JSON.stringify([{ userName: 'Bob', activities: [{ workoutType: 'Swimming', workoutMinutes: 45 }] }]));
});

});
