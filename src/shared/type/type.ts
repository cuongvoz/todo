export type Filter = {
    id: number,
    title: string,
    link?: string
}
export type Todo = {
    id?: number,
    title: string,
    isDone: boolean,
    time: string
}
export type FormTodo = {
    title: string,
    isDone: boolean,
    time: string
}
export type TodoReducer = {
    isError: boolean;
    isLoading: boolean;
    todos: Todo[];
};
export type Payload = {
    callback?: any,
    params?: string | number,
    response?: any,
}
export type Action = { type: string; payload: Payload };
interface FetchTodoDataAction {
    type: string;
    payload: Payload;
}
interface SetTodoDataAction {
    type: string;
    payload: Payload;
}
export type TodoActionTypes = SetTodoDataAction | FetchTodoDataAction;