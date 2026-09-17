import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiUrl = 'http://localhost:3000/api/products';
    private http = inject(HttpClient);

    //Get all products
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    //Add a new product
    addProduct(product: Product): Observable<any> {
        return this.http.post(this.apiUrl, product);
    }

    //Update a product
    updateProduct(id: string, product: Product): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, product);
    }

    //Delete a product
    deleteProduct(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
