import { Component } from '@angular/core';
import { TaskComponent } from '../../components/ui/task-card/task.component'; 
import {ITaskCard} from './config/config'
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import {CommonModule} from '@angular/common'


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [TaskComponent,MatIcon, MatSidenavModule, CommonModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.sass'
})
export class BaseComponent {
  public cards:ITaskCard[]=[{
    taskTitle: 'Card1',
    taskAssignedTo: 'worker 1',
    taskPriority: 'LOW',
    taskStatus: 'INPROGRESS',
    taskDeadline: new Date
  },
  {
    taskTitle: 'Card2',
    taskAssignedTo: 'worker 1',
    taskPriority: 'MEDIUM',
    taskStatus: 'DONE',
    taskDeadline: new Date
  },
  {
    taskTitle: 'Card3',
    taskAssignedTo: 'worker 1',
    taskPriority: 'HIGH',
    taskStatus: 'TODO',
    taskDeadline: new Date
  }
]
  openedDrawer:boolean = false
  createCard(val:HTMLInputElement){
    
  }

  //для открытия side-menu
  toggler(){
    this.openedDrawer = !this.openedDrawer
    console.log(this.openedDrawer)
  }
}
