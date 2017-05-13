import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { default as reducer } from './reducers';
import { AppComponent } from './containers/app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoComponent } from './components/todos/todo.component';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './effects/todos.effects';
import { TodosService } from './services/todos.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddTodoComponent } from './components/todos/add-todo.component';
import { TodospageComponent } from './containers/todos-page.component';
import { HomepageComponent } from './containers/home-page.component';
import { FilterComponent } from './components/filter/filter.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoActions } from './actions/todo.actions';
import { FilterActions } from './actions/filter.actions';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoComponent,
    AddTodoComponent,
    TodospageComponent,
    HomepageComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(TodosEffects)
  ],
  providers: [TodoActions, FilterActions, TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
