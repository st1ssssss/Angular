import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common'
import { TaskStatuses,ITaskCard } from '../../../pages/base/config/config';
import { TaskComponent } from '../task-card/task.component';
import { CreateFormComponent } from '../create-form/create-form.component';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskComponent, CreateFormComponent, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.sass'
})
export class BoardComponent {
  @Input('title') boardTitle:TaskStatuses
  @Input('cardsInfo') cardsInfo: ITaskCard[]=[]
  ngOnChanges(){
    this.cardsInfo = this.cardsInfo.filter(el=> el.taskStatus === this.boardTitle)
  }
  addMode:boolean = false
}
