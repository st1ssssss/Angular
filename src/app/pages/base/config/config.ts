export type taskPriorities = 'LOW'|'MEDIUM'|'HIGH' 
export type TaskStatuses = 'TODO'|'INPROGRESS'|'DONE'
export type KeysLocalStorage = 'TODO'|'INPROGRESS'|'DONE'|'CARDS'
type ILocalStorageServiceMethods = 'SET'|'EDIT'|'GET'|'DELETE'


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