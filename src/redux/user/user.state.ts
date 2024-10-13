export interface User{
    id: string,
    email: string,
    password: string,
    name: string
}

export interface UserListModel{
    user: User,
    userList: User[]
}