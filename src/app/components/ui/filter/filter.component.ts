import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { FilterPriorities, taskPriorities } from '../../../pages/base/config/config';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatSelectModule, MatIcon,MatFormFieldModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.sass'
})
export class FilterComponent {
  constructor(private localService:LocalStorageService){}
// @Input('workers')workers:string[]
ngOnInit(){
  if(this.localService.notEmpryWorkers()){
    this.workers = this.localService.getWorkers()
  }
  this.localService.storageObservable$.subscribe(data=>{
    console.log(data)
    if(data.method === 'FILTER'){
      this.workers= data.data
    }
  })
}
priorities:FilterPriorities[] = ['LOW','MEDIUM','HIGH', '']
workers:string[]=['worker1']
mode:string
filterCards(val:NgForm){
  console.log(val.value)
  this.localService.filterCardsLocal(val.value)
}
}
