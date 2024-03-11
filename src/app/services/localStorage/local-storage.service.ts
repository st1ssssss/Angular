import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITaskCard, TaskStatuses } from '../../pages/base/config/config';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubject = new Subject<any>();
  public storageObservable$ = this.storageSubject.asObservable();
  constructor() {
   }
   init(key:TaskStatuses){
    localStorage.setItem(key, JSON.stringify([]))
  }
   setTask(card:ITaskCard){
    const storedData =  JSON.parse(localStorage.getItem(card.taskStatus)!)
    localStorage.setItem(card.taskStatus, JSON.stringify([card, ...storedData]))
    this.storageSubject.next([card]) 
   }

  get(status: TaskStatuses): Observable<ITaskCard[]> {
    return new Observable((observer) => {
      observer.next(JSON.parse(localStorage.getItem(status)!));
    });
  }
  
  deleteOne(card:ITaskCard) {
    const storedData:ITaskCard[] = JSON.parse(localStorage.getItem(card.taskStatus)!);
    const reducedData = storedData.filter(el=>el.taskId != card.taskId) 
    if (reducedData) {
      localStorage.setItem(card.taskStatus, JSON.stringify(reducedData))
      this.storageSubject.next([card])
    }
}
}


