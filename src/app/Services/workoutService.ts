import { Injectable } from '@angular/core';
import { Workout } from '../workout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutsSource = new BehaviorSubject<Workout[]>([]);
  constructor() {
    const initialWorkouts = this.initializeWorkouts();
    this.workoutsSource.next(initialWorkouts);
  }
  workouts$ = this.workoutsSource.asObservable();

  private initializeWorkouts(): Workout[] {
    const workoutsJson = localStorage.getItem('workouts');
    if (workoutsJson) {
      console.log('Loaded from localStorage:', workoutsJson);
      return JSON.parse(workoutsJson);
    } else {
      const defaultWorkouts: Workout[] = [
        { sno: 1, username: 'JohnDoe', workout_type: 'Cycling', duration: 30 },
        { sno: 2, username: 'JaneDoe', workout_type: 'Running', duration: 45 },
        { sno: 3, username: 'AliceSmith', workout_type: 'Yoga', duration: 60 }
      ];
      this.saveWorkoutsToLocalStorage(defaultWorkouts);
      return defaultWorkouts;
    }
  }

  private saveWorkoutsToLocalStorage(workouts: Workout[]) {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  setWorkouts(workouts: Workout[]) {
    this.workoutsSource.next(workouts);
    this.saveWorkoutsToLocalStorage(workouts);
  }

  addWorkout(workout: Workout) {
    const currentWorkouts = this.workoutsSource.value;
    const updatedWorkouts = [...currentWorkouts, workout];
    this.workoutsSource.next(updatedWorkouts);
    this.saveWorkoutsToLocalStorage(updatedWorkouts);
  }

  deleteWorkout(sno: number) {
    const currentWorkouts = this.workoutsSource.value;
    const filteredWorkouts = currentWorkouts.filter(workout => workout.sno !== sno);
    const updatedWorkouts = filteredWorkouts.map((workout, index) => { 
      workout.sno = index + 1;
      return workout;
    });
    this.workoutsSource.next(updatedWorkouts);
    this.saveWorkoutsToLocalStorage(updatedWorkouts);
    return updatedWorkouts;
  }

  getWorkouts(): Workout[] {
    return this.workoutsSource.value;
  }
}