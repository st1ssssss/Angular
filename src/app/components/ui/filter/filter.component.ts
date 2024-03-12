import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatSelectModule, MatIcon,MatFormFieldModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.sass'
})
export class FilterComponent {
  constructor(private localService:LocalStorageService){}
filters:string[] = ['workers', 'deadline', 'priority']
mode:string
filterCards(val:NgForm){
  console.log(val.value)
  //this.localService.filterCardsLocal(val.value.filter)
}
}
