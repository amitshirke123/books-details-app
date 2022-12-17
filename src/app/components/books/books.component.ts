import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddEditModalComponent } from 'src/app/shared/modals/add-edit-modal/add-edit-modal.component';
import { BooksService } from 'src/app/shared/services/books/books.service';

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

  constructor(private bookService: BooksService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bookService.getBooks()
      .subscribe((response: any) => {
        this.authorDetails = response;
        this.booksList = response.data.books;
      });

      this.booksForm = this.fb.group({
        id: [''],
        title: [''],
        PublishDate: [''],
        purchaseLink: [''],
        imageUrl: ['']
      })
  }

  editBook(index: number = 0, bookDetails: any = {}){
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
    if(this.booksForm.value.id){
      this.booksList.map((val: any, index: number) => {
        if(index == this.booksForm.value.id){
          val.title = this.booksForm.value.title;
          val.PublishDate = this.booksForm.value.PublishDate;
          val.purchaseLink = this.booksForm.value.purchaseLink;
          val.imageUrl = this.booksForm.value.imageUrl;
        } 
      })
    } else {
      this.booksList.push(this.booksForm.value);
    }
    
  }

  deleteBook(book: any){
    this.booksList.indexOf(book) > -1 ? this.booksList.splice(this.booksList.indexOf(book), 1): null;
    // this.booksList.map((val: any, index: number) => {
    //   if(index == this.booksForm.value.id){
    //     val.title = this.booksForm.value.title
    //   }
    // })
  }

  // openModal(){
  //   this.modalRef = this.modalService.open(AddEditModalComponent, {
  //     ariaLabelledBy: 'modal-edit-books',
  //     backdrop: 'static',
  //     windowClass: 'modal fade',
  //     keyboard: false
  //   })
  //   return this.modalRef.result.then(
  //     (result) => {
  //       // return false to staye on page
  //       return false;
  //     },
  //     (reason) => {
  //        // return true  to discard changes and continue routing
  //       return true;
  //     }
  //    );
  // }

}
