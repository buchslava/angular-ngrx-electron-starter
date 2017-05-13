import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { TodosService } from '../services/todos.service';
import { TodoActions } from '../actions/todo.actions';
import { getFilterState } from '../reducers/index';

@Injectable()
export class TodosEffects {
  constructor( private actions$: Actions,
               private todoActions: TodoActions,
               private todosService: TodosService,
               private store: Store<{}> ) {
  }

  @Effect() getTodos$ = this.actions$
    .ofType(TodoActions.GET_TODOS)
    .withLatestFrom(this.store.select(getFilterState), ( action, filter ) => filter)
    .switchMap(filter =>
      this.todosService.getTodos(filter)
        .map(todos => this.todoActions.getTodosSucces(todos))
        .catch(() => Observable.of(this.todoActions.getTodosError()))
    );

  @Effect() addTodo$ = this.actions$
    .ofType(TodoActions.ADD_TODO)
    .switchMap(action =>
      this.todosService.addTodo(action.payload.title)
        .map(todo => this.todoActions.addTodoSuccess(todo) )
        .catch(() => Observable.of(this.todoActions.addTodoError()))
    );

}
