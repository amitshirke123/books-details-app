import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) { }

  public getBooks() {
    const url = `https://s3.amazonaws.com/api-fun/books.json`;
    return this.httpClient.get(url).pipe(
      map(response => response)
    );
  }

}
