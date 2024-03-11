import { Component, Input} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ITaskCard, TaskStatuses } from '../../../pages/base/config/config';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.sass'
})
export class CreateFormComponent {
  constructor(private localStorageService:LocalStorageService){}
  task:ITaskCard
  @Input('status')status: TaskStatuses
  createTask(val:HTMLInputElement){
    this.task = {
      taskTitle: val.value,
      taskDeadline: new Date,
      taskAssignedTo:'',
      taskPriority:undefined,
      taskStatus: this.status,
      taskId: Date.now()
    }
    this.localStorageService.setTask(this.task)
  }
}
