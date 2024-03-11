import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ITaskCard, TaskStatuses } from '../../../pages/base/config/config';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.sass'
})
export class CreateFormComponent {
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
    console.log(this.task)
  }
}
