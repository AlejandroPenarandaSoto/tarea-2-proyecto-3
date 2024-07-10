import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProduct } from '../interfaces';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct>{

  protected override source: string = 'products';
  private itemListSignal = signal<IProduct[]>([]);
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

  public save(item: IProduct) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update((products: IProduct[]) => [response, ...products]);
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

  public update(item: IProduct) {
    this.edit(item.productId, item).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().map(product => product.productId === item.productId ? item : product);
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

  public delete(product: IProduct) {
    this.del(product.productId).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().filter((p: IProduct) => p.productId != product.productId);
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
