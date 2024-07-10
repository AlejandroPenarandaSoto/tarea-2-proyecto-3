import { CategoryService } from './../../../services/category.service';
import { Component, EventEmitter, Input,Output } from '@angular/core';
import { IProduct, ICategory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {
  @Input() title: string = '';
  @Input() toUpdateProduct: IProduct = {
    category:{
      categoryId:1
    }
  };
  @Input() categoryList :ICategory[] = [];
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  addEdit()  {
    console.log('ToUpdateProduct:', this.toUpdateProduct);
    console.log('CategoryList length:', this.categoryList.length);
    this.callParentEvent.emit(this.toUpdateProduct);
  }
}
