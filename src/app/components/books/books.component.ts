import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/shared/services/books/books.service';

interface Book {
  id: number,
  title: string,
  PublishDate: string,
  purchaseLink: string,
  imageUrl: string
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  authorDetails: any = {};
  booksList: any = []

  booksForm!: FormGroup;
  modalTitle: string = '';
  selectedBook: Book | undefined;

  constructor(private bookService: BooksService, private fb: FormBuilder) { }

  ngOnInit(): void {
      this.bookService.getBooks()
        .subscribe((response: any) => {
          this.authorDetails = response;
          this.booksList = response.data.books;
        });

      this.booksForm = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        PublishDate: ['', Validators.required],
        purchaseLink: ['', Validators.required],
        imageUrl: ['', Validators.required]
      })
  }

  openAddEditModal(index: number = -1, bookDetails: any = {}){
    Object.keys(bookDetails).length > 0 ? this.modalTitle = 'Edit Book Details': this.modalTitle = 'Add New Book';
    this.booksForm.patchValue({
        id: index,
        title: bookDetails?.title,
        PublishDate: bookDetails?.PublishDate,
        purchaseLink: bookDetails?.purchaseLink,
        imageUrl: bookDetails?.imageUrl
    })
  }

  saveBook(){
    if(this.booksForm.value.id != -1 && this.booksForm.valid){
      this.booksList.map((val: any, index: number) => {
        if(index == this.booksForm.value.id){
          val.title = this.booksForm.value.title;
          val.PublishDate = this.booksForm.value.PublishDate;
          val.purchaseLink = this.booksForm.value.purchaseLink;
          val.imageUrl = this.booksForm.value.imageUrl;
        } 
      })
    } else if(this.booksForm.valid) {
      this.booksList.push(this.booksForm.value);
    }
    
  }

  openConfirmModal(book: Book){
    this.selectedBook = book;
  }

  deleteBook(){
    this.booksList.indexOf(this.selectedBook) > -1 ? this.booksList.splice(this.booksList.indexOf(this.selectedBook), 1): null;
  }

}
