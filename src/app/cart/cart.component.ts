import { Component, inject, signal, effect } from '@angular/core';
import { CartItemComponent } from "./ui/cart-item/cart-item.component";
import { CartStateService } from '../shared/data-access/cart-state.service';
import { RouterLink } from '@angular/router';
import { Product } from '../shared/interfaces/product.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'cart',
  imports: [CartItemComponent, RouterLink, DecimalPipe ],
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

  decreseFromCart(product: Product) {
    this.cartState.decrease({
      product,
      quantity: 1
    })
  }

  removeFromCart(product: Product) {
    this.cartState.remove({
      product,
      quantity: 1
    })
  }
  
}
