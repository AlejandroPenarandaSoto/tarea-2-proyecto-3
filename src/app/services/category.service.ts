import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategory } from '../interfaces';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<ICategory>{
  protected override source: string = 'categories';
  private itemListSignal = signal<ICategory[]>([]);
  private snackBar = inject(MatSnackBar);
  
  get items$() {
    return this.itemListSignal
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

  public save(item: ICategory) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update((categories: ICategory[]) => [response, ...categories]);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
        console.error('error', error);
      }
    })
  } 

  public update(item: ICategory) {
    this.edit(item.categoryId, item).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().map(category => category.categoryId === item.categoryId ? item : category);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
        console.error('error', error);
      }
    })
  }

  public delete(category: ICategory) {
    this.del(category.categoryId).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().filter((c: ICategory) => c.categoryId != category.categoryId);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
      }
    })
  }

}
