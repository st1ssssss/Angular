import { Component } from '@angular/core';
import { TaskComponent } from '../../components/ui/task-card/task.component'; 
import {ITaskCard, TaskStatuses} from './config/config'
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import {CommonModule} from '@angular/common'
import { BoardComponent } from '../../components/ui/board/board.component';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { EditSideBarComponent } from '../../components/ui/edit-side-bar/edit-side-bar.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [EditSideBarComponent, BoardComponent,TaskComponent,MatIcon, MatSidenavModule, CommonModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.sass'
})
export class BaseComponent {
  constructor(private localStorageService: LocalStorageService){
  }
  ngOnInit(){
    this.statuses.forEach(status=>this.localStorageService.init(status))
    this.localStorageService.storageObservable$.subscribe(data=>{
      this.reduceData(data)
    })
  }

  statuses:TaskStatuses[] = ['TODO','INPROGRESS', 'DONE']
public cards:ITaskCard[] = [] 

  //для открытия side-menu

  reduceData(val:ITaskCard[]){
    for(let i = 0;i<val.length;i++){
      if(this.cards.includes(val[i])){
        this.cards = this.cards.filter(card=>card.taskId!=val[i].taskId)
      }else{
        this.cards=[...val, ...this.cards]
      }
    }
    console.log(this.cards)
  }
}
