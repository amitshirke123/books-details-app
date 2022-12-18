import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksService } from 'src/app/shared/services/books/books.service';

import { BooksComponent } from './books.component';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksComponent ],
      providers: [BooksService],
      imports: [HttpClientModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async(() => {
    component.booksForm.controls['title'].setValue('');
    component.booksForm.controls['PublishDate'].setValue('');
    expect(component.booksForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.booksForm.controls['title'].setValue('title');
    component.booksForm.controls['PublishDate'].setValue('2022');
    component.booksForm.controls['purchaseLink'].setValue('https://www.amazon.com/BFG-Roald-Dahl/dp/0142410381/ref=sr_1_3?ie=UTF8&qid=1501899423&sr=8-3&keywords=roald+dahl');
    component.booksForm.controls['imageUrl'].setValue('https://images-na.ssl-images-amazon.com/images/I/51oQX1lEFAL._AC_US218_.jpg');
    
    expect(component.booksForm.valid).toBeTruthy();
  }));

});
