import { Component } from '@angular/core';
import { TaskComponent } from '../../components/ui/task-card/task.component'; 
import {ITaskCard, TaskStatuses} from './config/config'
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import {CommonModule} from '@angular/common'
import { BoardComponent } from '../../components/ui/board/board.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [BoardComponent,TaskComponent,MatIcon, MatSidenavModule, CommonModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.sass'
})
export class BaseComponent {
  public cards:ITaskCard[]=[{
    taskTitle: 'Card1',
    taskAssignedTo: 'worker 1',
    taskPriority: 'LOW',
    taskStatus: 'INPROGRESS',
    taskDeadline: new Date,
    taskId:Date.now()
  },
  {
    taskTitle: 'Card2',
    taskAssignedTo: 'worker 1',
    taskPriority: 'MEDIUM',
    taskStatus: 'DONE',
    taskDeadline: new Date,
    taskId:Date.now()
  },
  {
    taskTitle: 'Card3',
    taskAssignedTo: 'worker 1',
    taskPriority: 'HIGH',
    taskStatus: 'TODO',
    taskDeadline: new Date,
    taskId:Date.now()
  }
]
public statuses: TaskStatuses[] = ['TODO', 'INPROGRESS', 'DONE']
  openedDrawer:boolean = false
  createCard(val:HTMLInputElement){
    
  }

  //для открытия side-menu
  toggler(){
    this.openedDrawer = !this.openedDrawer
    console.log(this.openedDrawer)
  }
}
