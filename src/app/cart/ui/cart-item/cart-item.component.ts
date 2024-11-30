import { Component, input } from '@angular/core';
import { ProductItemCart } from '../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cart-item',
  imports: [RouterLink],
  templateUrl: './cart-item.component.html',
  styles: ``
})
export class CartItemComponent {

  product = input.required<ProductItemCart>()

}
