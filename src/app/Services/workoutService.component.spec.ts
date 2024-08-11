import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workoutService';
import { Workout } from '../workout';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutService]
    });
    service = TestBed.inject(WorkoutService);
  });

  afterEach(() => {
    // Clear localStorage after each test to avoid side effects
    localStorage.removeItem('workouts');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default workouts if no workouts in localStorage', () => {
    const defaultWorkouts: Workout[] = [
      { sno: 1, username: 'JohnDoe', workout_type: 'Cycling', duration: 30 },
      { sno: 2, username: 'JaneDoe', workout_type: 'Running', duration: 45 },
      { sno: 3, username: 'AliceSmith', workout_type: 'Yoga', duration: 60 }
    ];
    const workouts = service.getWorkouts();
    expect(workouts).toEqual(defaultWorkouts);
  });

  it('should save workouts to localStorage and initialize from it', () => {
    const newWorkouts: Workout[] = [
      { sno: 1, username: 'NewUser', workout_type: 'Swimming', duration: 50 }
    ];
    service.setWorkouts(newWorkouts);

    // Create a new instance to test if data is reloaded correctly
    const newServiceInstance = TestBed.inject(WorkoutService);
    const workouts = newServiceInstance.getWorkouts();
    expect(workouts).toEqual(newWorkouts);
  });

  it('should add a new workout', () => {
    const initialWorkouts: Workout[] = [
      { sno: 1, username: 'JohnDoe', workout_type: 'Cycling', duration: 30 }
    ];
    service.setWorkouts(initialWorkouts);

    const newWorkout: Workout = { sno: 2, username: 'JaneDoe', workout_type: 'Running', duration: 45 };
    service.addWorkout(newWorkout);

    const workouts = service.getWorkouts();
    expect(workouts.length).toBe(2);
    expect(workouts).toContain(newWorkout);
  });

  it('should delete a workout', () => {
    const initialWorkouts: Workout[] = [
      { sno: 1, username: 'JohnDoe', workout_type: 'Cycling', duration: 30 },
      { sno: 2, username: 'JaneDoe', workout_type: 'Running', duration: 45 }
    ];
    service.setWorkouts(initialWorkouts);

    service.deleteWorkout(1);

    const workouts = service.getWorkouts();
    expect(workouts.length).toBe(1);
  });

  it('should update serial numbers after deletion', () => {
    const initialWorkouts: Workout[] = [
      { sno: 1, username: 'JohnDoe', workout_type: 'Cycling', duration: 30 },
      { sno: 2, username: 'JaneDoe', workout_type: 'Running', duration: 45 }
    ];
    service.setWorkouts(initialWorkouts);

    service.deleteWorkout(1);

    const workouts = service.getWorkouts();
    expect(workouts.length).toBe(1);
    expect(workouts[0].sno).toBe(1); // Verify that serial number is updated
  });
});
