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
  low:ITaskCard[]
  mid:ITaskCard[]
  high:ITaskCard[]
   dataTransfer:IDataTransfer
   defaultCard:ITaskCard = {
      taskTitle:'asd',
      taskAssignedTo:'worker1',
      taskDeadline: new Date,
      taskId: '1234234',
      taskPriority: 'HIGH',
      taskStatus:'TODO',
      taskDescription:''
   }
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

  notEmpty(){
    return localStorage.getItem('CARDS') ? true : false
  }

  // filterCardsLocal(filter:string){
  //   switch (filter) {
  //     // case 'workers':
  //     //   const data = this.get('CARDS')
  //     //   let worker:ITaskCard[] = data.filter(el=>{

  //     //   })
  //     //   break;
  //     // case 'deadline':
        
  //     //   break;
  //     case 'priority':
  //       const data = this.get('CARDS')
  //       console.log(data)
  //       data.forEach(el=>{
  //         if(el.taskPriority === 'LOW'){
  //           console.log(el)
            
  //         }
  //       })
  //       console.log(this.low)
  //       this.storageSubject.next([...this.low])
  //       break;
  //     default:
  //       break;
  //   }
  // }

  setTask(card:ITaskCard){
    const storedData =  JSON.parse(localStorage.getItem(card.taskStatus)!)
    localStorage.setItem(card.taskStatus, JSON.stringify([card, ...storedData]))
    this.dataTransfer = {
      data:[card],
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
      data:[card],
      method:'EDIT'
    }
    this.edit(card)
    this.storageSubject.next(this.dataTransfer)
   }

  get(key: KeysLocalStorage):ITaskCard[] {
    return JSON.parse(localStorage.getItem(key)!)
  }
  
  getTask(id:string){
    const data:ITaskCard[] = JSON.parse(localStorage.getItem('CARDS')!)
    console.log(data)
    const reducedData = data.find(el=>{
          return el.taskId == id
        })
        console.log(reducedData)
    if(reducedData){
      return reducedData
    }else{
      return this.defaultCard
    }
  }

  deleteOne(card:ITaskCard) {
    const storedData:ITaskCard[] = JSON.parse(localStorage.getItem(card.taskStatus)!);
    const reducedData = storedData.filter(el=>el.taskId != card.taskId) 
    if (reducedData) {
      localStorage.setItem(card.taskStatus, JSON.stringify(reducedData))
      this.dataTransfer = {
        data:[card],
        method:'DELETE'
      }
      this.delete(card)
      this.storageSubject.next(this.dataTransfer)
    }
}
}


