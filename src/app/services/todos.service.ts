import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mapTo';

@Injectable()
export class TodosService {
  todos = [
    {id: 1, title: 'Learn ngrx/store', completed: false},
    {id: 2, title: 'Learn ngrx/effects', completed: false}
  ];

  getTodos(filter) {
    return Observable.timer(1000).mapTo(this.getVisibleTodos(this.todos, filter));
  }

  getVisibleTodos(todos, filter) {
    if (filter === 'SHOW_ALL') {
      return todos;
    } else if (filter === 'SHOW_COMPLETED') {
      return todos.filter(t => t.completed);
    } else {
      return todos.filter(t => !t.completed);
    }
  }

  addTodo(title: string) {
    return Observable.timer(2000)
      .mapTo({id: Math.random(), title, completed: false});
  }
}
