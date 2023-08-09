import React from "react";
import { FormTodo, Todo } from "../shared/type/type";
import instance from "./api";

export const getAllTask = async (params: string = ''): Promise<Todo[]> => {
    try {
        return (await instance.get(`/todos${params}`)).data;
    } catch (error: any) {
        throw new Error('An error occurred:', error.message);
    }
}
export const deleteTaskById = async (id: number): Promise<void> => {
    try {
        await instance.delete('/todos/' + id);
    } catch (error: any) {
        throw new Error('An error occurred:', error.message);
    }
}
export const editTask = async (todo: Todo): Promise<Todo> => {
    try {
        return (await instance.put('/todos/' + todo.id, todo)).data;
    } catch (error: any) {
        throw new Error('An error occurred:', error.message);
    }
}
export const addTask = async (todo: FormTodo): Promise<Todo> => {
    try {
       return (await instance.post('/todos', todo)).data;
    } catch (error: any) {
        throw new Error('An error occurred:', error.message);
    }
}
