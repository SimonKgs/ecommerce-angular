import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { TruncatePipe } from '../../../shared/utils/pipes/truncate.pipe';
import { ProductStarsComponent } from "../product-stars/product-stars.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-card',
  imports: [TruncatePipe, ProductStarsComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {

  product = input.required<Product>()

  addToCart = output<Product>()

  add(event:Event) {
    event.stopPropagation()
    event.preventDefault()
    this.addToCart.emit(this.product())    
  }

}
