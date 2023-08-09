import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Action, Todo, TodoActionTypes, TodoReducer } from '../../../shared/type/type';
import { FAILURE, REQUEST, SUCCESS, DELETE, DONE_TASK, CREATE, EDIT } from '../../../shared/constants/constants';

type MyContextProviderProps = {
  children: ReactNode;
};

type Dispatch = (action: Action) => void;
const MyContext = createContext<{ state: TodoReducer; dispatch: React.Dispatch<TodoActionTypes> } | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoContextProvider');
  }
  return context;
}

const initialState: TodoReducer = {
  todos: [],
  isLoading: false,
  isError: false
};

export const reducer = (state: TodoReducer = initialState, action: Action): TodoReducer => {
  const { response, params } = action.payload;
  switch (action.type) {
    case REQUEST:
      return { ...state, isLoading: true };
    case SUCCESS:
      return { ...state, todos: response || [], isLoading: false };
    case DELETE:
      return { ...state, todos: state.todos.filter(item => item.id !== params), isLoading: false };
    case CREATE:
      return { ...state, todos: [...state.todos, response], isLoading: false };
    case EDIT:
      const editTodos = state.todos.map(item => {
        if (item.id === response.id) {
          return response;
        }
        return item;
      });
      return { ...state, todos: editTodos, isLoading: false };
    case DONE_TASK:
      const updatedTodos = state.todos.map(todo => {
        if (todo.id === params) {
          return { ...todo, isDone: true };
        }
        return todo;
      });
      return { ...state, todos: updatedTodos, isLoading: false };
    case FAILURE:
      return { ...state, isError: true, isLoading: false };
    default:
      return state;
  }
}
const TodoProvider = ({ children }: MyContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = {
    state,
    dispatch,
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
}
export default TodoProvider;