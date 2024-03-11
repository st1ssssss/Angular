import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ITaskCard } from '../../../pages/base/config/config';
import {CommonModule} from '@angular/common'
import {MatButtonModule} from '@angular/material/button';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/dataService/data-service.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatIconModule, MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass'
})
export class TaskComponent implements OnInit, OnDestroy {
constructor(private localStorageService:LocalStorageService, private DataService:DataService){
}

ngOnInit(): void {
    this.subscription = this.DataService.currentCardInfo.subscribe(card=>this.dataServCard = card)
    this.subscriptionDrawer = this.DataService.currentOpenDrawer.subscribe(drawer => this.openedDrawer = drawer)

}
ngOnDestroy(): void {
  this.subscription.unsubscribe()
  this.subscriptionDrawer.unsubscribe()
}
@Input('taskCardInfo') taskCardInfo:ITaskCard
dataServCard:ITaskCard
subscription: Subscription
subscriptionDrawer:Subscription
openedDrawer:boolean = true

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
editTask(){
this.DataService.createCardInfo(this.taskCardInfo)
this.DataService.toggleOpenDrawer(true)
console.log(this.taskCardInfo)
}
}
