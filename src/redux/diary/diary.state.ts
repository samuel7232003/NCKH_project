export interface Diary{
    _id: string;
    idUser: string;
    date: string;
    survey: number;
    message: string
}

export interface ListDiary{
    idUser: string;
    diarys: Diary[];
}

export interface DiaryModel{
    diary: Diary;
    listDiary: ListDiary;
}