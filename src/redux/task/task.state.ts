export interface Task{
    _id: string;
    idUser: string;
    time: string;
    date: string;
    content: string;
    type: string;
}

export interface listTask{
    idUser: string;
    task: Task[];
}

export interface TaskModel{
    task: Task;
    listTask: listTask;
}