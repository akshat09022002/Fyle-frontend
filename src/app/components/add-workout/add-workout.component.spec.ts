import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { AddWorkoutComponent } from './add-workout.component';
import { WorkoutService } from '../../Services/workoutService';
import { Workout } from '../../workout';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', ['getWorkouts', 'addWorkout']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, DropdownModule, AddWorkoutComponent],
      providers: [{ provide: WorkoutService, useValue: workoutServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;

    // Mock the getWorkouts method
    workoutService.getWorkouts.and.returnValue([
      { sno: 1, username: 'JohnDoe', workout_type: 'Cardio', duration: 30 },
      { sno: 2, username: 'JaneDoe', workout_type: 'Running', duration: 45 }
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.newWorkout).toEqual({
      sno: 0,
      username: '',
      workout_type: '',
      duration: 0
    });
    expect(component.workoutTypes.length).toBeGreaterThan(0);
  });


  it('should add a new workout', () => {
   // Arrange
  // Set up the existing workouts in the service to determine the next 'sno'
  const existingWorkouts: Workout[] = [
    { sno: 1, username: 'JohnDoe', workout_type: 'Cardio', duration: 30 },
    { sno: 2, username: 'JaneDoe', workout_type: 'Running', duration: 45 }
  ];
  
  
  // Prepare the new workout
  component.newWorkout = {
    sno: 0, // This will be updated by addWorkout
    username: 'Alice',
    workout_type: 'Yoga',
    duration: 60
  };

  const form: any = { valid: true, resetForm: jasmine.createSpy() }; // Simulate valid form

  // Act
  component.addWorkout(form);

  // Assert
  const expectedSno = 3; // Since we have 2 existing workouts, sno should be 3
  expect(workoutService.addWorkout).toHaveBeenCalledWith({
    sno: expectedSno,
    username: 'Alice',
    workout_type: 'Yoga',
    duration: 60
  });
  
  // Check if the newWorkout was reset correctly
  expect(component.newWorkout).toEqual({ sno: 0, username: '', workout_type: '', duration: 0 });
  
  // Verify that form.resetForm was called
  expect(form.resetForm).toHaveBeenCalled();
});


  it('should reset the form after adding a workout', () => {
    // Arrange
    component.newWorkout = {
      sno: 0,
      username: 'JohnDoe',
      workout_type: 'Cardio',
      duration: 30
    };

    const form: any = { valid: true, resetForm: jasmine.createSpy() }; 

    // Act
    component.addWorkout(form);

    // Assert
    expect(component.newWorkout).toEqual({ sno: 0, username: '', workout_type: '', duration: 0 });
    expect(form.resetForm).toHaveBeenCalled();
  });

  it('should populate workout types dropdown', () => {
    // Arrange
    const dropdownOptions = component.workoutTypes.map(option => option.label);

    // Act
    fixture.detectChanges();

    // Assert
    expect(dropdownOptions).toContain('Cardio');
    expect(dropdownOptions).toContain('Yoga');
  });
});
