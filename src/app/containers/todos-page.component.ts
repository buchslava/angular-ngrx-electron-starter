import { Component, NgZone, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import { ElectronService } from 'ngx-electron';

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
      <app-filters [filters] = "filters"
                   [active] = "activeFilter$ | async"
                   (changeFilter) = "changeFilter($event)">
      </app-filters>
      <input type = "button" (click) = "open()" value = "Open">
      <input type = "button" (click) = "save()" value = "Save">
      <input type = "button" (click) = "redo()" value = "Redo">
      <input type = "button" (click) = "undo()" value = "Undo">
      <app-todos [todos] = "todos$ | async"
                 (toggle) = "toggleTodo($event)"
                 (remove) = "removeTodo($event)"></app-todos>

      <app-add-todo (add) = "addTodo($event)" [reset] = "addTodoSuccess$ | async"
                    [pending] = "addTodo$ | async"></app-add-todo>
  `,
  styleUrls: ['./todos-page.component.css']
})
export class TodospageComponent implements OnDestroy {
  todos$: Observable<TodosState>;
  addTodoSuccess$: Observable<Action>;
  addTodo$: Observable<Action>;
  activeFilter$: Observable<TodoFilter>;

  filters: FilterRecord[] = [{id: 'SHOW_ALL', title: 'All'}, {id: 'SHOW_COMPLETED', title: 'Completed'}, {
    id: 'SHOW_ACTIVE',
    title: 'Active'
  }];

  constructor(private zone: NgZone,
              private electronService: ElectronService,
              private store: Store<AppState>,
              private todoActions: TodoActions,
              private filterActions: FilterActions,
              private todosEffects: TodosEffects,
              private todoService: TodosService) {
    this.store.dispatch(todoActions.getTodos());
    this.activeFilter$ = store.select(getFilterState);
    this.addTodo$ = this.todosEffects.addTodo$;
    this.addTodoSuccess$ = this.addTodo$.filter(({type}) => type === TodoActions.ADD_TODO_SUCCESS);
    this.todos$ = Observable.combineLatest(this.store.select(getTodosState), this.activeFilter$,
      (todos: TodosState, filter: TodoFilter): TodosState => {
        return {
          pending: todos.pending,
          error: todos.error,
          data: this.todoService.getVisibleTodos(todos.data, filter)
        };
      }
    );

    const newTodoContent = Observable.fromEvent(
      this.electronService.ipcRenderer, 'new-todo-content', (event, content) => content);

    newTodoContent.subscribe((content: string) => {
      let jsonContent = null;

      try {
        jsonContent = JSON.parse(content);
      } catch (err) {
        return;
      }

      this.todoService.todos = jsonContent;
      this.zone.run(() => {
        this.store.dispatch(todoActions.getTodos());
      });
    });
  }

  ngOnDestroy() {
    this.synchronizeServiceDataWithStore();
  }

  addTodo(title: string) {
    this.store.dispatch(this.todoActions.addTodo(title));
  }

  toggleTodo(todo: TodoItem) {
    this.store.dispatch(this.todoActions.toggleTodo(todo));
  }

  removeTodo(todo: TodoItem) {
    this.store.dispatch(this.todoActions.removeTodo(todo));
  }

  changeFilter(filter: TodoFilter) {
    this.store.dispatch(this.filterActions.setVisibilityFilter(filter));
  }

  open() {
    this.electronService.ipcRenderer.send('open-from-file');
  }

  save() {
    this.electronService.ipcRenderer.send('save-to-file', this.getCurrentState().todos.data);
  }

  getCurrentState() {
    let state = null;

    this.store.subscribe(s => state = s);

    return state;
  }

  synchronizeServiceDataWithStore() {
    this.todoService.todos = this.getCurrentState().todos.data;
  }

  redo() {
    this.store.dispatch({type: 'REDO'});
  }

  undo() {
    this.store.dispatch({type: 'UNDO'});
  }
}
