import { Component, input, output } from '@angular/core';
import { Product, ProductItemCart } from '../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'cart-item',
  imports: [RouterLink, DecimalPipe ],
  templateUrl: './cart-item.component.html',
  styles: ``
})
export class CartItemComponent {

  product = input.required<ProductItemCart>()

  addToCart = output<Product>()
  removeFromCart = output<Product>()
  decreseFromCart = output<Product>()

  add(event:Event) {
    event.stopPropagation()
    event.preventDefault()
    this.addToCart.emit(this.product().product)    
  }

  remove(event:Event) {
    event.stopPropagation()
    event.preventDefault()
    this.removeFromCart.emit(this.product().product)    
  }

  decrease(event:Event) {
    event.stopPropagation()
    event.preventDefault()
    this.decreseFromCart.emit(this.product().product)    
  }

}
