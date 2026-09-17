import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { Router } from '@angular/router';

@Component({
  imports: [

  ],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})

export class ProductsComponent implements OnInit {
  router = inject(Router);

  productService = inject(ProductService);

  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },

      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  editProduct(product: Product): void {
    this.router.navigate(['/update', product._id]);
  }

  deleteProduct(product: Product): void {
    if (!product._id) {
      return;
    }

    this.productService.deleteProduct(product._id).subscribe({
      next: () => {
        this.loadProducts();
      },

      error: (err) => {
        console.error('Error deleting product:', err);
      }
    })
  }

  addProduct(): void {
    this.router.navigate(['/add']);
  }
}
