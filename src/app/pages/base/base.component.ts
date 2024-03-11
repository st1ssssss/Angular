import { Component } from '@angular/core';
import { TaskComponent } from '../../components/ui/task-card/task.component'; 
import {ITaskCard, TaskStatuses} from './config/config'
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import {CommonModule} from '@angular/common'
import { BoardComponent } from '../../components/ui/board/board.component';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [BoardComponent,TaskComponent,MatIcon, MatSidenavModule, CommonModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.sass'
})
export class BaseComponent {
  constructor(private localStorageService: LocalStorageService){
  }
  ngOnInit(){
    this.statuses.forEach(status=>this.localStorageService.init(status))
  }
  
  openedDrawer:boolean = false

  statuses:TaskStatuses[] = ['TODO','INPROGRESS', 'DONE']
//   public cards:ITaskCard[]=[{
//     taskTitle: 'Card1',
//     taskAssignedTo: 'worker 1',
//     taskPriority: 'LOW',
//     taskStatus: 'INPROGRESS',
//     taskDeadline: new Date,
//     taskId:Date.now()
//   },
//   {
//     taskTitle: 'Card2',
//     taskAssignedTo: 'worker 1',
//     taskPriority: 'MEDIUM',
//     taskStatus: 'DONE',
//     taskDeadline: new Date,
//     taskId:Date.now()
//   },
//   {
//     taskTitle: 'Card3',
//     taskAssignedTo: 'worker 1',
//     taskPriority: 'HIGH',
//     taskStatus: 'TODO',
//     taskDeadline: new Date,
//     taskId:Date.now()
//   },{
//     taskTitle: 'Card1',
//     taskAssignedTo: 'worker 1',
//     taskPriority: 'LOW',
//     taskStatus: 'INPROGRESS',
//     taskDeadline: new Date,
//     taskId:Date.now()
//   },
//   {
//     taskTitle: 'Card2',
//     taskAssignedTo: 'worker 1',
//     taskPriority: 'MEDIUM',
//     taskStatus: 'DONE',
//     taskDeadline: new Date,
//     taskId:Date.now()
//   },
//   {
//     taskTitle: 'Card3',
//     taskAssignedTo: 'worker 1',
//     taskPriority: 'HIGH',
//     taskStatus: 'TODO',
//     taskDeadline: new Date,
//     taskId:Date.now()
//   },{
//     taskTitle: 'Card1',
//     taskAssignedTo: 'worker 1',
//     taskPriority: 'LOW',
//     taskStatus: 'INPROGRESS',
//     taskDeadline: new Date,
//     taskId:Date.now()
//   },
//   {
//     taskTitle: 'Card2',
//     taskAssignedTo: 'worker 1',
//     taskPriority: 'MEDIUM',
//     taskStatus: 'DONE',
//     taskDeadline: new Date,
//     taskId:Date.now()
//   },
//   {
//     taskTitle: 'Card3',
//     taskAssignedTo: 'worker 1',
//     taskPriority: 'HIGH',
//     taskStatus: 'TODO',
//     taskDeadline: new Date,
//     taskId:Date.now()
//   },
// ]
public cards:ITaskCard[]

subTODO = this.localStorageService.get('TODO').subscribe(data=>this.cards=data)
  //для открытия side-menu
  toggler(){
    this.openedDrawer = !this.openedDrawer
    console.log(this.openedDrawer)
  }
}
