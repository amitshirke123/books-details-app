import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BooksService } from './services/books/books.service';
import { HttpClientModule } from '@angular/common/http';
import { AddEditModalComponent } from './modals/add-edit-modal/add-edit-modal.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [HeaderComponent, AddEditModalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [BooksService],
  exports:[HeaderComponent]
})
export class SharedModule { }
