import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  template: `
      <input type = "text" placeholder = "Add todo.." [formControl] = "control">
      <button (click) = "add.next(control.value)">Add</button>
      <div *ngIf="_pending">processing...</div>
  `,
  styleUrls: ['./add-todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent implements OnInit {
  control: FormControl = new FormControl('');
  @Output() add = new EventEmitter();

  private _pending = false;

  constructor() {
    this.add.subscribe(() => {
      this._pending = true;
    });
  }

  ngOnInit() {
  }

  @Input()
  set reset(action) {
    if (action) {
      this.control.reset();
    }
  }

  @Input()
  set pending(action) {
    if (action) {
      this._pending = false;
    }
  }
}
