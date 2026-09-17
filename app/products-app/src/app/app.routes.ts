import { Routes } from '@angular/router';

import { ProductsComponent } from './components/products/products';
import { AddProductComponent } from './components/add-product/add-product';
import { UpdateProductComponent } from './components/update-product/update-product';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'add',
        component: AddProductComponent
    },
    {
        path: 'update/:id',
        component: UpdateProductComponent
    }
];