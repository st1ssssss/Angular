import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/dataService/data-service.service';
import { ITaskCard, TaskStatuses, taskPriorities } from '../../../pages/base/config/config';
import { MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForm} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-side-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule,MatSelectModule,MatSidenavModule, MatInputModule, MatFormFieldModule],
  templateUrl: './edit-side-bar.component.html',
  styleUrl: './edit-side-bar.component.sass'
})
export class EditSideBarComponent implements OnInit, OnDestroy {
  constructor(private DataService:DataService, private localStorageServices: LocalStorageService){}
  cardInfo:ITaskCard
  subscriptionCard:Subscription
  subscriptionDrawer:Subscription
  optionTaskPriorities: taskPriorities[] = ['LOW', 'MEDIUM','HIGH']
  optionTaskStatuses: TaskStatuses[] = ['TODO', 'INPROGRESS', 'DONE']
  openedDrawer:boolean
ngOnInit(): void {
  this.subscriptionCard = this.DataService.currentCardInfo.subscribe(card=>this.cardInfo = card)
  this.subscriptionDrawer = this.DataService.currentOpenDrawer.subscribe(drawer => this.openedDrawer = drawer)
}
ngOnDestroy(): void {
  this.subscriptionCard.unsubscribe()
  this.subscriptionDrawer.unsubscribe()
}

submitChanges(val: NgForm){
  this.cardInfo = {
    taskTitle: val.value.taskTitle,
    taskAssignedTo: val.value.taskAssignedTo,
    taskId: this.cardInfo.taskId,
    taskDeadline: val.value.taskDeadline,
    taskPriority: val.value.taskPriority,
    taskStatus: val.value.taskStatus
  }
  this.localStorageServices.editTask(this.cardInfo)
  this.DataService.toggleOpenDrawer(false)
}
}
