import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Workout } from '../../workout';
import { WorkoutService } from '../../Services/workoutService';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule], // Import required modules here
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
  
  
export class AddWorkoutComponent{
  workouts: Workout[] = [];
  workoutTypes = [
    { label: 'Cardio', value: 'Cardio' },
    { label: 'Strength', value: 'Strength' },
    { label: 'Flexibility', value: 'Flexibility' },
    { label: 'Endurance', value: 'Endurance' },
    { label: 'Balance', value: 'Balance' },
    { label: 'Yoga', value: 'Yoga' }
  ];

  newWorkout: Workout = {
    sno: 0,
    username: '',
    workout_type: '',
    duration: 0
  };

  constructor(private workoutService: WorkoutService) {
    this.workouts = this.workoutService.getWorkouts();
  }

  ngOnInit() {

  }

  addWorkout(form: NgForm) {
    if (form.valid) {
     
      this.workouts = this.workoutService.getWorkouts();
      this.newWorkout.sno = this.workouts.length ? Math.max(...this.workouts.map(w => w.sno)) + 1 : 1;

      
      this.workoutService.addWorkout(this.newWorkout);

     
      this.newWorkout = { sno: 0, username: '', workout_type: '', duration: 0 };
      form.resetForm();
    }
  }
}
