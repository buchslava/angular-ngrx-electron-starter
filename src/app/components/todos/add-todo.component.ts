import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  template: `
    <input type="text" placeholder="Add todo.." [formControl]="control">
    <button (click)="add.next(control.value)">Add</button>
  `,
  styleUrls: ['./add-todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent implements OnInit {

  control : FormControl = new FormControl('');
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public set reset( action ) {
    action && this.control.reset();
  }
}
