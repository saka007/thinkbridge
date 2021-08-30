import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://api.paybeingz.com";

  constructor(private httpClient: HttpClient) {

  }

  readItems(): Observable<Item[]>{
    return this.httpClient.get<Item[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  createItem(item: Item): Observable<Item>{
    return this.httpClient.post<Item>(`${this.PHP_API_SERVER}/api/create.php`, item);
  }
  updateItem(item: Item){
    return this.httpClient.put<Item>(`${this.PHP_API_SERVER}/api/update.php`, item);   
  }
  deleteItem(id: number){
    return this.httpClient.delete<Item>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }


}
