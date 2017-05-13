import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';

import { Action, Store } from '@ngrx/store';
import { TodosEffects } from '../effects/todos.effects';
import { TodosService } from '../services/todos.service';
import { TodoActions } from '../actions/todo.actions';
import { FilterActions } from '../actions/filter.actions';
import { TodosState } from '../reducers/todos.reducer';
import { AppState, getFilterState, getTodosState } from '../reducers';
import { FilterRecord, TodoFilter } from '../models/filter.model';
import { TodoItem } from '../models/todo.model';

@Component({
  selector: 'app-todospage',
  template: `
    <app-filters [filters]="filters"
             [active]="activeFilter$ | async"
             (changeFilter)="changeFilter($event)">
    </app-filters>
    <app-todos [todos]="todos$ | async" (toggle)="toggleTodo($event)" (remove)="removeTodo($event)"></app-todos>

    <app-add-todo (add)="addTodo($event)" [reset]="addTodoSuccess$ | async"></app-add-todo>
  `,
  styleUrls: ['./todos-page.component.css']
})
export class TodospageComponent {
  todos$: Observable<TodosState>;
  addTodoSuccess$: Observable<Action>;
  activeFilter$: Observable<TodoFilter>;

  filters: FilterRecord[] = [{id: 'SHOW_ALL', title: 'All'}, {id: 'SHOW_COMPLETED', title: 'Completed'}, {
    id: 'SHOW_ACTIVE',
    title: 'Active'
  }];

  constructor(private store: Store<AppState>,
              private todoActions: TodoActions,
              private filterActions: FilterActions,
              private todosEffects: TodosEffects,
              private todoService: TodosService) {
    this.store.dispatch(todoActions.getTodos());
    this.activeFilter$ = store.select(getFilterState);
    this.addTodoSuccess$ = this.todosEffects.addTodo$.filter(( { type }) => type === TodoActions.ADD_TODO_SUCCESS);
    this.todos$ = Observable.combineLatest(this.store.select(getTodosState), this.activeFilter$,
      (todos: TodosState , filter: TodoFilter): TodosState => {
        return {
          pending: todos.pending,
          error: todos.error,
          data: this.todoService.getVisibleTodos(todos.data, filter)
        };
      }
    );
  }

  addTodo( title: string ) {
    this.store.dispatch(this.todoActions.addTodo(title));
  }

  toggleTodo( todo: TodoItem ) {
    this.store.dispatch(this.todoActions.toggleTodo(todo));
  }

  removeTodo( todo: TodoItem ) {
    this.store.dispatch(this.todoActions.removeTodo(todo));
  }

  changeFilter( filter: TodoFilter ) {
    this.store.dispatch(this.filterActions.setVisibilityFilter(filter));
  }

}
