import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IDataTransfer, IFilterConfig, ITaskCard, KeysLocalStorage, TaskStatuses } from '../../pages/base/config/config';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubject = new Subject<any>();
  public storageObservable$ = this.storageSubject.asObservable();
  constructor() {
   }
  filtered:ITaskCard[]=[]
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
  
  private setWorker(card:ITaskCard){
    const storedData:string[] =  JSON.parse(localStorage.getItem('WORKERS')!)
    if(storedData.indexOf(card.taskAssignedTo!, 0)==-1){
      localStorage.setItem('WORKERS', JSON.stringify([card.taskAssignedTo, ...storedData]))
      this.storageSubject.next({data:[card.taskAssignedTo, ...storedData], method:'FILTER'})
    }
  }
  private set(card:ITaskCard){
    const storedData:ITaskCard[] =  JSON.parse(localStorage.getItem('CARDS')!)
    localStorage.setItem('CARDS', JSON.stringify([card, ...storedData]))
  }
  private edit(card:ITaskCard){
    const storedData:ITaskCard[] =  JSON.parse(localStorage.getItem('CARDS')!)
    const reduceData = storedData.filter(el=>el.taskId != card.taskId)
    this.setWorker(card)
    localStorage.setItem('CARDS', JSON.stringify([card, ...reduceData]))
   }
   private delete(card:ITaskCard){
    const storedData:ITaskCard[] = JSON.parse(localStorage.getItem('CARDS')!);
    const reducedData = storedData.filter(el=>el.taskId != card.taskId) 
    if (reducedData) {
      localStorage.setItem('CARDS', JSON.stringify(reducedData))
   }
   }
   private deleteWorker(card:ITaskCard){
    const storedCards:ITaskCard[] = JSON.parse(localStorage.getItem('CARDS')!)
    let storedData:string[] =  JSON.parse(localStorage.getItem('WORKERS')!)
    const indexOfWorker = storedData.indexOf(card.taskAssignedTo!, 0)
    if(indexOfWorker!=-1){
      console.log(indexOfWorker)
      console.log(storedCards)
      const flag = storedCards.filter(el=>el.taskAssignedTo===storedData[indexOfWorker])
      console.log(flag)
      if(flag.length===1)
      storedData = storedData.filter(el=>el!=card.taskAssignedTo)
      localStorage.setItem('WORKERS', JSON.stringify([ ...storedData]))
      this.storageSubject.next({data:[ ...storedData], method:'FILTER'})
    }
   }

  notEmpty(){
    return localStorage.getItem('CARDS') ? true : false
  }
  notEmpryWorkers(){
    return localStorage.getItem('WORKERS') ? true : false

  }

  filterCardsLocal(filter:IFilterConfig){

    if(filter.priority!=undefined&&filter.worker!=undefined){
      const data = this.get('CARDS')
      data.forEach(el=>{
        if(el.taskPriority===filter.priority&&el.taskAssignedTo===filter.worker){
          this.filtered = [el, ...this.filtered]
        }
      })
      this.storageSubject.next({data: this.filtered, method: 'GET'})
      this.filtered=[]
    } else if(filter.priority!=undefined&&filter.worker==undefined){
      const data = this.get('CARDS')
      data.forEach(el=>{
        if(el.taskPriority===filter.priority){
          this.filtered = [el, ...this.filtered]
        }
      })
      this.storageSubject.next({data: this.filtered, method: 'GET'})
      this.filtered=[]
    }else if(filter.priority==undefined&&filter.worker!=undefined){
      const data = this.get('CARDS')
      data.forEach(el=>{
        if(el.taskAssignedTo===filter.worker){
          this.filtered = [el, ...this.filtered]
        }
      })
      this.storageSubject.next({data: this.filtered, method: 'GET'})
      this.filtered=[]
    }else{
      const data = this.get('CARDS')
      this.storageSubject.next({data: data, method: 'GET'})
    }
    
  }

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
    this.deleteWorker(card)
    this.edit(card)
    this.storageSubject.next(this.dataTransfer)
   }

  get(key: KeysLocalStorage):ITaskCard[] {
    return JSON.parse(localStorage.getItem(key)!)
  }
  getWorkers():string[]{
    const workers = JSON.parse(localStorage.getItem('WORKERS')!)
    return workers
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
      this.deleteWorker(card)
      this.delete(card)
      this.storageSubject.next(this.dataTransfer)
    }
}
}


