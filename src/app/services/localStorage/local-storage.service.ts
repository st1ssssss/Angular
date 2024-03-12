import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IDataTransfer, ITaskCard, TaskStatuses } from '../../pages/base/config/config';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubject = new Subject<any>();
  public storageObservable$ = this.storageSubject.asObservable();
  constructor() {
   }
   dataTransfer:IDataTransfer

   init(key:TaskStatuses){
    localStorage.setItem(key, JSON.stringify([]))
  }
   setTask(card:ITaskCard){
    const storedData =  JSON.parse(localStorage.getItem(card.taskStatus)!)
    localStorage.setItem(card.taskStatus, JSON.stringify([card, ...storedData]))
    this.dataTransfer = {
      data:card,
      method:'SET'
    }
    this.storageSubject.next(this.dataTransfer) 
   }

   editTask(card:ITaskCard){
    const storedData:ITaskCard[] =  JSON.parse(localStorage.getItem(card.taskStatus)!)
    const reduceData = storedData.filter(el=>el.taskId != card.taskId)
    localStorage.setItem(card.taskStatus, JSON.stringify([card, ...reduceData]))
    this.dataTransfer = {
      data:card,
      method:'EDIT'
    }
    this.storageSubject.next(this.dataTransfer)
   }

  get(id: number): Observable<ITaskCard[]> {
    return new Observable((observer) => {
      observer.next(JSON.parse(localStorage.getItem(status)!));
    });
  }
  
  deleteOne(card:ITaskCard) {
    const storedData:ITaskCard[] = JSON.parse(localStorage.getItem(card.taskStatus)!);
    const reducedData = storedData.filter(el=>el.taskId != card.taskId) 
    if (reducedData) {
      localStorage.setItem(card.taskStatus, JSON.stringify(reducedData))
      this.dataTransfer = {
        data:card,
        method:'DELETE'
      }
      this.storageSubject.next(this.dataTransfer)
    }
}
}


