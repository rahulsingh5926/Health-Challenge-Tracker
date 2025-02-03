import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutComponent } from './add-workout.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ButtonModule],
  
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with one empty workout entry', () => {
    expect(component.workouts.length).toBe(1);
    expect(component.workouts[0]).toEqual({ workoutType: '', workoutMinutes: 0 });
  });

  it('should add a new workout entry', () => {
    component.addWorkout();
    expect(component.workouts.length).toBe(2);
  });

  it('should remove a workout entry', () => {
    component.addWorkout(); // Add a second workout
    component.removeWorkout(1);
    expect(component.workouts.length).toBe(1);
  });

  it('should not submit if username is empty', () => {
    spyOn(window, 'alert');
    component.userName = ' ';
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid username.');
  });

  it('should not submit if no valid workouts are present', () => {
    spyOn(window, 'alert');
    component.userName = 'John Doe';
    component.workouts = [{ workoutType: '', workoutMinutes: 0 }];
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please add at least one valid workout.');
  });

  it('should store a valid workout in localStorage', () => {
    spyOn(localStorage, 'setItem');
    component.userName = 'John Doe';
    component.workouts = [{ workoutType: 'Running', workoutMinutes: 30 }];
    component.onSubmit();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should add a new workout entry to localStorage', () => {
    spyOn(localStorage, 'setItem');
    component.userName = 'Alice';
    component.workouts = [{ workoutType: 'Yoga', workoutMinutes: 20 }];
    component.onSubmit();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workouts',
      jasmine.stringMatching('"userName":"Alice"')
    );
  });
});
