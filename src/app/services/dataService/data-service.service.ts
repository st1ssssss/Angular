import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITaskCard } from '../../pages/base/config/config';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cardInfoSource = new BehaviorSubject<ITaskCard>({
    taskId:'123', taskTitle:'', taskAssignedTo:'', taskPriority:undefined,taskDeadline:new Date, taskStatus:'TODO', taskDescription:''
  })
  private openDrawer = new BehaviorSubject<boolean>(false)
  currentCardInfo = this.cardInfoSource.asObservable()
  currentOpenDrawer = this.openDrawer.asObservable()
  constructor() { }

  createCardInfo(val:ITaskCard){
    this.cardInfoSource.next(val)
  }
  getPreviousCardInfo(){
    return this.cardInfoSource.value
  }
  toggleOpenDrawer(val:boolean){
    this.openDrawer.next(val)
  }
}
