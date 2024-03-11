import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ITaskCard } from '../../../pages/base/config/config';
import {CommonModule} from '@angular/common'
import {MatButtonModule} from '@angular/material/button';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatIconModule, MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass'
})
export class TaskComponent {
constructor(private localStorageService:LocalStorageService){
}

@Input('taskCardInfo') taskCardInfo:ITaskCard
priorityClass(){
  switch (this.taskCardInfo.taskPriority) {
    case 'HIGH':
      return 'high-priority'
    case 'MEDIUM':
      return 'medium-priority'
    case 'LOW':
      return 'low-priority'
    default:
      return ''
  }
}
removeTask(){
  this.localStorageService.deleteOne(this.taskCardInfo)
}
}
