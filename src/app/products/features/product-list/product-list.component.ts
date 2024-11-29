import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access/products-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { ReversePipe } from '../../../shared/utils/pipes/reverse-array.pipe';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, ReversePipe],
  templateUrl: './product-list.component.html',
  styles: '',
  providers: [ProductsStateService, CartStateService]
})
export default class ProductListComponent {


  productsState = inject(ProductsStateService)
  cartState = inject(CartStateService).state

  // para cargar más productos
  changePage() {
    const nextPage = this.productsState.state().page + 1 
    this.productsState.changePage$.next(nextPage)
  }
  // add products to cart
  addToCart(product: Product) {
    this.cartState.add({
      product,
      quantity: 1
    })
    
  }
  

}
