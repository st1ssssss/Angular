import { Component, Input} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ITaskCard, TaskStatuses } from '../../../pages/base/config/config';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule ,MatIcon,  FormsModule, ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.sass'
})
export class CreateFormComponent {
  constructor(private localStorageService:LocalStorageService){}
  task:ITaskCard
  titleCreate:string
  @Input('status')status: TaskStatuses
  createTask(val:NgForm){
    if(val.value){
      this.task = {
        taskTitle: val.value.titleCreate,
        taskDeadline: new Date,
        taskAssignedTo:'',
        taskPriority:undefined,
        taskStatus: this.status,
        taskId: String(Date.now()),
        taskDescription:''
      }
      this.localStorageService.setTask(this.task)
      this.titleCreate = ''
    }
  }
}
