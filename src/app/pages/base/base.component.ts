import { Component } from '@angular/core';
import { TaskComponent } from '../../components/ui/task-card/task.component'; 
import {IDataTransfer, ITaskCard, TaskStatuses} from './config/config'
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
      console.log(data)
      this.reduceData(data)
    })
  }

  statuses:TaskStatuses[] = ['TODO','INPROGRESS', 'DONE']
public cards:ITaskCard[] = [] 

  //для открытия side-menu

  reduceData(data:IDataTransfer){
    switch (data.method) {
      case 'SET':
        this.cards=[data.data, ...this.cards]
        break;
      case "DELETE":
          this.cards = this.cards.filter(card=>card.taskId!=data.data.taskId)
        break
      case 'EDIT':
        let reduced = this.cards.filter(el => el.taskId != data.data.taskId)
        this.cards = [data.data, ...reduced]
        break
      default:
        break;
    }
    console.log(this.cards)
  }
}
