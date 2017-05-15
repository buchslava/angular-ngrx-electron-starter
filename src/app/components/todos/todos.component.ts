import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as fromTodos from '../../reducers/todos.reducer';
import { TodoItem } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  template: `
      <div *ngIf = "todos.pending">Loading...</div>
      <div *ngIf = "!todos.pending">
          <app-todo [todo] = "todo"
                    *ngFor = "let todo of todos.data" (toggle) = "toggle.emit($event)" (remove) = "remove.emit($event)">
          </app-todo>
          <div *ngIf = "todos.error">{{todos.error}}</div>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  @Input() todos: fromTodos.TodosState;
  @Output() toggle = new EventEmitter<TodoItem>();
  @Output() remove = new EventEmitter<TodoItem>();

  ngOnInit() {
  }
}
