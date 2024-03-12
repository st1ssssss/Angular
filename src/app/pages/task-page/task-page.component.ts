import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { ITaskCard } from '../base/config/config';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, MatButtonModule,MatFormFieldModule,MatInputModule,MatIcon,MatCardModule],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.sass'
})
export class TaskPageComponent {
  constructor(private router: ActivatedRoute, private localStorageService:LocalStorageService){}

  cardForPage:ITaskCard={
    taskTitle:'asd',
    taskAssignedTo:'worker1',
    taskDeadline: new Date,
    taskId: '1234234',
    taskPriority: 'HIGH',
    taskStatus:'TODO',
    taskDescription:'asdasdasd'
  }
  prevCard: ITaskCard
ngOnInit(){
  // this.subCard = this.dataService.currentCardInfo.subscribe()
  this.router.queryParams.subscribe((params)=>{
    const {id} = params
    console.log(id)
    this.cardForPage = this.localStorageService.getTask(id)
    this.prevCard = this.localStorageService.getTask(id)
    console.log(this.cardForPage)
  })  
}

submitChanges(val: NgForm){
  console.log(val.value)
  this.cardForPage.taskDescription = val.value.taskDescription
  this.localStorageService.editTask(this.cardForPage, this.prevCard)
}
}
