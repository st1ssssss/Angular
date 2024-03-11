export type taskPriorities = 'LOW'|'MEDIUM'|'HIGH' 
export type TaskStatuses = 'TODO'|'INPROGRESS'|'DONE'

export interface ITaskCard{
    taskId:number
    taskTitle: string
    taskAssignedTo: string|undefined
    taskPriority: taskPriorities|undefined
    taskStatus: TaskStatuses
    taskDeadline: Date|undefined
}