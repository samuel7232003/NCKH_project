export interface Task{
    _id: string;
    idUser: string;
    time: string;
    date: string;
    content: string;
    type: string;
}

export interface ListTask{
    idUser: string;
    tasks: Task[];
}

export interface TaskModel{
    task: Task;
    listTask: ListTask;
}