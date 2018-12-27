import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Item } from 'src/app/shared/Item.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoItems: Item[] = [];
  noItems: boolean;

  constructor(private tdService: TodoService,
              private router: Router) { }

  ngOnInit() {
    this.refreshItems();
  }

  onUpdate(id: number) {
    this.router.navigate(['updateItem/' + id]);
  }

  onDelete(id: number) {
    this.tdService.deleteItem(id).subscribe(() => {
      this.refreshItems();
    });
  }

  refreshItems() {
    this.tdService.getAllItems().subscribe(data => {
      this.todoItems = data;
      if (this.todoItems.length === 0) {
        this.noItems = true;
      } else {
        this.noItems = false;
      }
    });
  }
}
