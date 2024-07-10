import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../../../interfaces';
import { ProductService } from '../../../services/product.service';
import { ProductsFormComponent } from './../products-form/products-form.component';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductsFormComponent
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnChanges{
  @Input() itemList: IProduct[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: IProduct = {};
  private productService = inject(ProductService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: IProduct, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }

  onFormEventCalled (params: IProduct) {
    this.productService.update(params);
    this.modalService.dismissAll();
  }

  deleteProduct(product: IProduct) {
    this.productService.delete(product);
  }
}
