import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  selector: 'app-add-product',
  styleUrl: './add-product.css',
  templateUrl: './add-product.html',
})

export class AddProductComponent {
  router = inject(Router);

  productService = inject(ProductService);

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    type: '',
    description: '',
    units: 0
  };

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe({
      next: () => {
        console.log('Product added');
        this.router.navigate(['/products']);
      },

      error: (err) => {
        console.error('Error adding product:', err);

        if (err.status === 409) {
          alert('A product with this ID already exists.');
        }
      }
    });
  }

  returnToProducts(): void {
    this.router.navigate(['/products']);
  }
}
