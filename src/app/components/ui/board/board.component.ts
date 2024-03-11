import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common'
import { TaskStatuses } from '../../../pages/base/config/config';
import { CreateFormComponent } from '../create-form/create-form.component';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CreateFormComponent, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.sass'
})
export class BoardComponent {
  @Input('title') boardTitle:TaskStatuses

  addMode:boolean = false
}
