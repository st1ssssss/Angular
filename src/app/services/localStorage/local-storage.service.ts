import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IDataTransfer, ITaskCard, KeysLocalStorage, TaskStatuses } from '../../pages/base/config/config';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubject = new Subject<any>();
  public storageObservable$ = this.storageSubject.asObservable();
  constructor() {
   }
   dataTransfer:IDataTransfer

   init(key:KeysLocalStorage){
    localStorage.setItem(key, JSON.stringify([]))
  }

  private set(card:ITaskCard){
    const storedData =  JSON.parse(localStorage.getItem('CARDS')!)
    localStorage.setItem('CARDS', JSON.stringify([card, ...storedData]))
  }
  private edit(card:ITaskCard){
    const storedData:ITaskCard[] =  JSON.parse(localStorage.getItem('CARDS')!)
    const reduceData = storedData.filter(el=>el.taskId != card.taskId)
    console.log(storedData)
    console.log(reduceData)
    localStorage.setItem('CARDS', JSON.stringify([card, ...reduceData]))
   }
   private delete(card:ITaskCard){
    const storedData:ITaskCard[] = JSON.parse(localStorage.getItem('CARDS')!);
    const reducedData = storedData.filter(el=>el.taskId != card.taskId) 
    if (reducedData) {
      localStorage.setItem('CARDS', JSON.stringify(reducedData))
   }
   }

  setTask(card:ITaskCard){
    const storedData =  JSON.parse(localStorage.getItem(card.taskStatus)!)
    localStorage.setItem(card.taskStatus, JSON.stringify([card, ...storedData]))
    this.dataTransfer = {
      data:card,
      method:'SET'
    }
    this.set(card)
    this.storageSubject.next(this.dataTransfer) 
  }

   editTask(card:ITaskCard, prevCard:ITaskCard){
     this.deleteOne(prevCard)
    const storedData:ITaskCard[] =  JSON.parse(localStorage.getItem(card.taskStatus)!)
    const reduceData = storedData.filter(el=>el.taskId != card.taskId)
    localStorage.setItem(card.taskStatus, JSON.stringify([card, ...reduceData]))
    this.dataTransfer = {
      data:card,
      method:'EDIT'
    }
  this.edit(card)
    this.storageSubject.next(this.dataTransfer)
   }

  get(status: TaskStatuses): Observable<ITaskCard[]> {
    return new Observable((observer) => {
      observer.next(JSON.parse(localStorage.getItem(status)!));
    });
  }
  
  getTask(id:number){
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
      this.delete(card)
      this.storageSubject.next(this.dataTransfer)
    }
}
}


