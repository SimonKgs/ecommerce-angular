import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'products',
        title: 'Products',
        loadChildren:  () => import('./products/features/product-shell/product.route'),
    },
    {
        path: 'cart',
        title: 'Cart',
        loadChildren: () => import('./cart/cart.route'),
    },
    {
        path: '**',
        redirectTo: 'products'
    }
    
];

