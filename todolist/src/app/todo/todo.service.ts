import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../shared/Item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any> {
    return this.http.get(this.baseUrl + '/todoitems');
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/item/' + id);
  }

  addItem(item: Item): Observable<any> {
    return this.http.post(this.baseUrl + '/additem', item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/deleteitem/' + id);
  }

  updateItem(id: number, updatedItem: Item): Observable<any> {
    return this.http.put(this.baseUrl + '/updateItem/' + id, updatedItem);
  }
}
