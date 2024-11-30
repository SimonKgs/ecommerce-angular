import { Component, inject, signal, effect } from '@angular/core';
import { CartItemComponent } from "./ui/cart-item/cart-item.component";
import { CartStateService } from '../shared/data-access/cart-state.service';
import { RouterLink } from '@angular/router';
import { Product } from '../shared/interfaces/product.interface';

@Component({
  selector: 'cart',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart.component.html',
  styles: ``,
  providers: [CartStateService]
})
export default class CartComponent {
  cartState = inject(CartStateService).state
  totalPrice = signal<number>(0)

  effects = effect(() => 
    this.totalPrice.set(this.cartState.products().reduce(
      (acc, product) => acc + (product.product.price * product.quantity ), 0
    )
  ))

  addToCart(product: Product) {
    this.cartState.add({
      product,
      quantity: 1
    })
  }

  
}
