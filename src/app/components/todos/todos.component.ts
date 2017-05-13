import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as fromTodos from '../../reducers/todos.reducer';
import { TodoItem } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  template: `
    <p *ngIf="todos.pending">Loading...</p>
    <app-todo [todo]="todo"
          *ngFor="let todo of todos.data" (toggle)="toggle.emit($event)" (remove)="remove.emit($event)">
    </app-todo>
    <p *ngIf="todos.error">{{todos.error}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  @Input() todos: fromTodos.TodosState;
  @Output() toggle = new EventEmitter<TodoItem>();
  @Output() remove = new EventEmitter<TodoItem>();

  constructor() { }

  ngOnInit() {
  }

}
