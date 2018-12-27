import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemFormComponent } from './todo/item-form/item-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', redirectTo: '/addItem', pathMatch: 'full'},
  { path: 'addItem', component: ItemFormComponent },
  { path: 'updateItem/:id', component: ItemFormComponent },
  { path: 'todoList', component: TodoListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    ItemFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
