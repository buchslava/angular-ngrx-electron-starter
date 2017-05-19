import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import todosReducer, * as fromTodos from './todos.reducer';
import visibilityFilter from './visibiltyFilter.reducer';
import { TodoFilter } from '../models/filter.model';
import { TodoActions } from '../actions/todo.actions';
import { storeLogger } from 'ngrx-store-logger';
import { StateSwitcher, Policy } from 'ngrx-state-switcher';

export interface AppState {
  todos: fromTodos.TodosState;
  filter: TodoFilter;
}

const stateSwitcher = new StateSwitcher([
  {actionName: TodoActions.GET_TODOS, policy: Policy.ALWAYS},
  {actionName: TodoActions.ADD_TODO, policy: Policy.ALWAYS}
]).preventDefaultInit();
const stateSwitchReducer: Function = stateSwitcher.getStateReducer();

export default compose(storeLogger(), stateSwitchReducer, combineReducers)({
  todos: todosReducer,
  filter: visibilityFilter
});

export const getTodosState = (state: AppState) => state.todos;
export const getFilterState = (state: AppState) => state.filter;
