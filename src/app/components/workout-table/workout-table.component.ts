import { Component } from '@angular/core';
import { WorkoutService } from '../../Services/workoutService';
import { Workout } from '../../workout';
import { NgFor } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { filter } from 'rxjs';

@Component({
  selector: 'app-workout-table',
  standalone: true,
  imports: [NgFor, PaginatorModule,DropdownModule,FormsModule],
  templateUrl: './workout-table.component.html',
  styleUrls: ['./workout-table.component.css']
})
export class WorkoutTableComponent {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  paginatedWorkouts: Workout[] = [];
  rowsPerPage = 5;
  searchText: string = '';
  selectedWorkoutType: string = '';
  workoutTypes: any[] = [
    { label: 'Cardio', value: 'Cardio' },
    { label: 'Strength', value: 'Strength' },
    { label: 'Flexibility', value: 'Flexibility' },
    { label: 'Endurance', value: 'Endurance' },
    { label: 'Balance', value: 'Balance' },
    { label: 'Yoga', value: 'Yoga' }
  ];
  
  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.workouts$.subscribe((workouts) => {
      this.workouts = workouts;
      this.applyFilters();
      this.updatePaginatedWorkouts(0, this.rowsPerPage); 
    });
  }

  applyFilters() {
  
    this.filteredWorkouts = this.workouts
      .filter(workout => 
        workout.username.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (this.selectedWorkoutType ? workout.workout_type === this.selectedWorkoutType : true)
    );


    this.filteredWorkouts = this.filteredWorkouts.map((workout,index) => { 
      workout.sno = index + 1;
      return workout;
    });

    this.updatePaginatedWorkouts(0, this.rowsPerPage); 
  }

  paginate(event: any) {
    this.updatePaginatedWorkouts(event.first, event.rows);
  }

  updatePaginatedWorkouts(startIndex: number, rows: number) {
    const endIndex = startIndex + rows;
    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
  }

  deleteWorkout(sno: number) {
    this.workoutService.deleteWorkout(sno);
    this.applyFilters(); 
  }

  onSearchChange() {
    this.applyFilters(); 
  }

  onFilterChange() {
    this.applyFilters(); 
  }
}
