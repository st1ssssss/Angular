export type taskPriorities = 'LOW'|'MEDIUM'|'HIGH' 
export type TaskStatuses = 'TODO'|'INPROGRESS'|'DONE'
export type KeysLocalStorage = TaskStatuses|'CARDS'|'WORKERS'
export type FilterPriorities  = taskPriorities|''
type ILocalStorageServiceMethods = 'SET'|'EDIT'|'GET'|'DELETE'|'FILTER'


export interface ITaskCard{
    taskId:string
    taskTitle: string
    taskAssignedTo: string|undefined
    taskPriority: taskPriorities|undefined
    taskStatus: TaskStatuses
    taskDeadline: Date|undefined
    taskDescription:string|undefined
}

export interface IDataTransfer {
    data:ITaskCard[],
    method: ILocalStorageServiceMethods
   }

export interface IFilterConfig {
    priority: taskPriorities|undefined,
    worker: string|undefined
}