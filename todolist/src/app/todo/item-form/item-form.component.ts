import { TodoListComponent } from './../todo-list/todo-list.component';

import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Item } from 'src/app/shared/Item.model';
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  providers: [TodoListComponent],
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  updateItemId: number;
  addition = true;
  submitted = false;

  constructor(private fb: FormBuilder,
    private tdService: TodoService,
    private route: ActivatedRoute,
    private rotuer: Router,
    private itemList: TodoListComponent) { }

  ngOnInit() {
    this.createForm();
    this.updateItemId = +this.route.snapshot.paramMap.get('id');
    this.tdService.getItemById(this.updateItemId).subscribe((item: Item) => {
      if (item != null && this.updateItemId != null) {
        this.addition = false;
        this.itemForm.patchValue({
          title: item.title,
          description: item.description,
          startDate: item.startDate,
          endDate: item.endDate
        });
      }
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.itemForm.valid) {
      if (this.addition) {
        const newItem: Item = this.itemForm.value;
        this.tdService.addItem(newItem).subscribe(() => {
          this.itemList.refreshItems();
        });
        this.rotuer.navigate(['todoList']);
      } else {
        this.tdService.updateItem(this.updateItemId, this.itemForm.value).subscribe(() => {
          this.rotuer.navigate(['todoList']);
        });
      }
    } else {
      return;
    }
  }

  private createForm() {
    this.itemForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required)
    });
  }

  get f() {
    return this.itemForm.controls;
  }
}
