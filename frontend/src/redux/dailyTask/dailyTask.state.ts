export interface DailyTask{
    _id: string;
    idUser: string;
    start: string;
    end: string;
    content: string;
    type: string;
    color: string;
}

export interface ListDailyTask{
    idUser: string;
    dailyTasks: DailyTask[];
}

export interface DailyTaskModel{
    dailyTask: DailyTask;
    listDailyTask: ListDailyTask;
}