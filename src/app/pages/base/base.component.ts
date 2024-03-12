import { Component } from '@angular/core';
import { TaskComponent } from '../../components/ui/task-card/task.component'; 
import {IDataTransfer, ITaskCard, KeysLocalStorage, TaskStatuses} from './config/config'
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
    this.initialSub()
    
  }
  
statuses:TaskStatuses[] = ['TODO','INPROGRESS', 'DONE']
keysLocalStorage:KeysLocalStorage[] = [...this.statuses, 'CARDS']
public cards:ITaskCard[] = [] 

  private initialSub(){
    if(!this.localStorageService.notEmpty()){
      this.keysLocalStorage.forEach(key=>this.localStorageService.init(key))
      this.localStorageService.storageObservable$.subscribe(data=>{
        console.log(data)
        this.reduceData(data)
      })
    }else{
      for(let i = 0;i<localStorage.length;i++){
        if(i!=1){
          const data = this.localStorageService.get(localStorage.key(i)! as KeysLocalStorage)
          data.forEach(el=> this.reduceData({data: [el], method:'SET'}))
          this.localStorageService.storageObservable$.subscribe(data=>{
            console.log(data)
            this.reduceData(data)
          })
        }
      }
      
    }
  }

  reduceData(data:IDataTransfer){
    switch (data.method) {
      case 'SET':
        this.cards=[...data.data, ...this.cards]
        break;
      case "DELETE":
          this.cards = this.cards.filter(card=>card.taskId!=data.data[0].taskId)
        break
      case 'EDIT':
        let reduced = this.cards.filter(el => el.taskId != data.data[0].taskId)
        this.cards = [...data.data, ...reduced]
        break
      default:
        break
    }
    console.log(this.cards)
  }
}
