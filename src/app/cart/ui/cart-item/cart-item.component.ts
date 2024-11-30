import { Component, input, output } from '@angular/core';
import { Product, ProductItemCart } from '../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cart-item',
  imports: [RouterLink],
  templateUrl: './cart-item.component.html',
  styles: ``
})
export class CartItemComponent {

  product = input.required<ProductItemCart>()

  addToCart = output<Product>()

  add(event:Event) {
    event.stopPropagation()
    event.preventDefault()
    this.addToCart.emit(this.product().product)    
  }

}
