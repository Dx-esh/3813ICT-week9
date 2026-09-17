import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  selector: 'app-update-product',
  styleUrl: './update-product.css',
  templateUrl: './update-product.html',
})

export class UpdateProductComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);

  productService = inject(ProductService);

  productId = signal('');

  product = signal<Product | null>(null);

  ngOnInit(): void {
    this.productId.set(this.route.snapshot.paramMap.get('id') || '');

    this.productService.getProducts().subscribe({
      next: (products) => {
        const foundProduct = products.find(product => product._id === this.productId());

        if (foundProduct) {
          this.product.set({ ...foundProduct });
        }
      },

      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  updateProduct(): void {
    const product = this.product();

    if (!product) {
      console.error('No product found');
      return;
    }

    this.productService.updateProduct(this.productId(), product).subscribe({
      next: () => {
        console.log('Product updated');
        this.router.navigate(['/products']);
      },

      error: (err) => {
        console.error('Error updating products:', err);
      }
    });
  }

  returnToProducts(): void {
    this.router.navigate(['/products']);
  }
}
