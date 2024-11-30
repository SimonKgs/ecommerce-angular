import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'cart',
        title: 'Cart',
        loadChildren: () => import('./cart/cart.route'),
    },
    {
        path: '',
        title: 'Products',
        loadChildren:  () => import('./products/features/product-shell/product.route'),
    },
    {
        path: '**',
        redirectTo: 'products'
    }
    
];

