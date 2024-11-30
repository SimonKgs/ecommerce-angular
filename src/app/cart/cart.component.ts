import { Component, inject } from '@angular/core';
import { CartItemComponent } from "./ui/cart-item/cart-item.component";
import { CartStateService } from '../shared/data-access/cart-state.service';

@Component({
  selector: 'cart',
  imports: [CartItemComponent],
  templateUrl: './cart.component.html',
  styles: ``,
  providers: [CartStateService]
})
export default class CartComponent {
  cartState = inject(CartStateService).state

  
}
