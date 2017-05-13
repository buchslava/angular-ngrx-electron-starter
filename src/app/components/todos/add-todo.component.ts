import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  template: `
      <input type = "text" placeholder = "Add todo.." [formControl] = "control">
      <button (click) = "add.next(control.value)">Add</button>
      <div *ngIf="this.control.disabled">processing...</div>
  `,
  styleUrls: ['./add-todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent implements OnInit {
  control: FormControl = new FormControl('');
  @Output() add = new EventEmitter();

  constructor() {
    this.add.subscribe(() => {
      this.control.disable();
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
      this.control.enable();
    }
  }
}
