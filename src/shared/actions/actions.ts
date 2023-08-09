import { CREATE, DELETE, DONE_TASK, EDIT, REQUEST, SUCCESS } from "../constants/constants";
import { Action, Todo } from "../type/type";

export const actionRequest = (): Action => ({
    type: REQUEST,
    payload: {},
});
export const setTodoList = (todos: Todo[]): Action => ({
    type: SUCCESS,
    payload: { response: todos },
});

export const deleteTaskTodo = (id: number): Action => ({
    type: DELETE,
    payload: { params: id },
});
export const actionDoneTask = (id: number): Action => ({
    type: DONE_TASK,
    payload: { params: id },
});
export const actionCreate = (todo: Todo): Action => ({
    type: CREATE,
    payload: { response: todo },
});
export const actionEdit = (todo: Todo): Action => ({
    type: EDIT,
    payload: { response: todo },
});