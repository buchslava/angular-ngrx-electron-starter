import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { TodoList } from '../reducers/todos.reducer';
import { TodoItem } from '../models/todo.model';

@Injectable()
export class TodoActions {

  static GET_TODOS = 'GET_TODOS';
  getTodos(): Action {
    return {
      type: TodoActions.GET_TODOS
    };
  }

  static GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
  getTodosSucces(todos: TodoList): Action {
    return {
      type: TodoActions.GET_TODOS_SUCCESS,
      payload: todos
    };
  }

  static GET_TODOS_ERROR = 'GET_TODOS_ERROR';
  getTodosError(): Action {
    return {
      type: TodoActions.GET_TODOS_ERROR
    };
  }

  static ADD_TODO = 'ADD_TODO';
  addTodo(title: string): Action {
    return {
      type: TodoActions.ADD_TODO,
      payload: {
        title
      }
    };
  }

  static ADD_TODO_ERROR = 'ADD_TODO_ERROR';
  addTodoError(): Action {
    return {
      type: TodoActions.ADD_TODO_ERROR
    };
  }

  static ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
  addTodoSuccess(todo: TodoItem) {
    return {
      type: TodoActions.ADD_TODO_SUCCESS,
      payload: todo
    };
  }

  static TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
  toggleTodo(todo: TodoItem): Action {
    return {
      type: TodoActions.TOGGLE_COMPLETE,
      payload: todo
    };
  }

  static REMOVE_TODO = 'REMOVE_TODO';
  removeTodo(todo: TodoItem): Action {
    return {
      type: TodoActions.REMOVE_TODO,
      payload: todo
    };
  }

}
