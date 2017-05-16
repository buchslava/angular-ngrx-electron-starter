import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  template: `
      <input type = "text" placeholder = "Add todo.." [formControl] = "control">
      <button (click) = "add.next(control.value)">Add</button>
      <div *ngIf = "control.disabled">processing...</div>
  `,
  styleUrls: ['./add-todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {
  control: FormControl = new FormControl('');
  @Output() add = new EventEmitter();

  constructor() {
    this.add.subscribe(() => {
      this.control.disable();
    });
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
      this.control.enable();
    }
  }
}
