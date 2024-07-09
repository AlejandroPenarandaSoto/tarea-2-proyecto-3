import { CategoryService } from '../../../services/category.service';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { IAuthority, ICategory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CategoriesFormComponent
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnChanges{
  @Input() itemList: ICategory[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: ICategory = {};
  private gameService = inject(CategoryService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: ICategory, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }

  onFormEventCalled (params: ICategory) {
    this.gameService.update(params);
    this.modalService.dismissAll();
  }

  deleteCategory(category: ICategory) {
    this.gameService.delete(category);
  }
}
