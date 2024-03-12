export type taskPriorities = 'LOW'|'MEDIUM'|'HIGH' 
export type TaskStatuses = 'TODO'|'INPROGRESS'|'DONE'
type ILocalStorageServiceMethods = 'SET'|'EDIT'|'GET'|'DELETE'

export interface ITaskCard{
    taskId:number
    taskTitle: string
    taskAssignedTo: string|undefined
    taskPriority: taskPriorities|undefined
    taskStatus: TaskStatuses
    taskDeadline: Date|undefined
}

export interface IDataTransfer {
    data:ITaskCard,
    method: ILocalStorageServiceMethods
   }