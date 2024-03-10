type taskPriorities = 'LOW'|'MEDIUM'|'HIGH' 
type TaskStatuses = 'TODO'|'INPROGRESS'|'DONE'

export interface ITaskCard{
    taskTitle: string
    taskAssignedTo: string
    taskPriority: taskPriorities
    taskStatus: TaskStatuses
    taskDeadline: Date
}