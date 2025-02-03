import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not save workout if username is empty', () => {
    spyOn(window, 'alert'); // Spy on alert
    service.saveWorkout('', [{ workoutType: 'Running', workoutMinutes: 30 }]);
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid username.');
  });

  it('should not save workout if no valid workout is provided', () => {
    spyOn(window, 'alert');
    service.saveWorkout('John Doe', [{ workoutType: '', workoutMinutes: 0 }]);
    expect(window.alert).toHaveBeenCalledWith('Please add at least one valid workout.');
  });

  it('should save valid workouts to localStorage', () => {
    const mockWorkouts = [{ workoutType: 'Running', workoutMinutes: 30 }];
    service.saveWorkout('John Doe', mockWorkouts);
    const savedData = JSON.parse(localStorage.getItem('workouts') || '[]');
    expect(savedData.length).toBe(1);
    expect(savedData[0].userName).toBe('John Doe');
    expect(savedData[0].activities).toEqual(mockWorkouts);
  });

  it('should append new workouts to localStorage', () => {
    const firstWorkout = [{ workoutType: 'Running', workoutMinutes: 30 }];
    const secondWorkout = [{ workoutType: 'Cycling', workoutMinutes: 45 }];

    service.saveWorkout('John Doe', firstWorkout);
    service.saveWorkout('Jane Doe', secondWorkout);

    const savedData = JSON.parse(localStorage.getItem('workouts') || '[]');
    expect(savedData.length).toBe(2);
    expect(savedData[1].userName).toBe('Jane Doe');
    expect(savedData[1].activities).toEqual(secondWorkout);
  });

  it('should alert and not save an empty workout list', () => {
    spyOn(window, 'alert');
    service.saveWorkout('John Doe', []);
    expect(window.alert).toHaveBeenCalledWith('Please add at least one valid workout.');
    const savedData = JSON.parse(localStorage.getItem('workouts') || '[]');
    expect(savedData.length).toBe(0);
  });
});
