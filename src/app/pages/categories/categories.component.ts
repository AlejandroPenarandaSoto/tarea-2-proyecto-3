import { CategoriesFormComponent } from './../../components/category/categories-form/categories-form.component';
import { CategoryService } from './../../services/category.service';
import { CategoriesListComponent } from './../../components/category/categories-list/categories-list.component';
import { Component, OnInit, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ICategory } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    LoaderComponent,
    CategoriesListComponent,
    ModalComponent,
    CategoriesFormComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  public categoryService: CategoryService = inject(CategoryService);
  public modalService: NgbModal = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.categoryService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  onFormEventCalled (params: ICategory) {
    this.categoryService.save(params);
    this.modalService.dismissAll();
  }
}
