import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodospageComponent } from './containers/todos-page.component';
import { HomepageComponent } from './containers/home-page.component';

const appRoutes: Routes = [
  { path: '',   component: HomepageComponent, pathMatch: 'full' },
  { path: 'todos', component: TodospageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
