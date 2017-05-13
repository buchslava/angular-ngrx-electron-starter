import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import reducer from '../reducers';
import { TodospageComponent } from './todos-page.component';
import { AddTodoComponent } from '../components/todos/add-todo.component';
import { TodosComponent } from '../components/todos/todos.component';
import { TodoComponent } from '../components/todos/todo.component';
import { FilterComponent } from '../components/filter/filter.component';
import { TodosEffects } from '../effects/todos.effects';
import { TodosService } from '../services/todos.service';
import { TodoActions } from '../actions/todo.actions';
import { FilterActions } from '../actions/filter.actions';

describe('TodospageComponent', () => {
  let component: TodospageComponent;
  let fixture: ComponentFixture<TodospageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        EffectsModule,
        StoreModule.provideStore(reducer)],
      declarations: [ TodospageComponent, AddTodoComponent, TodosComponent, TodoComponent, FilterComponent ],
      providers: [
        TodosEffects, TodosService, TodoActions, FilterActions
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodospageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
