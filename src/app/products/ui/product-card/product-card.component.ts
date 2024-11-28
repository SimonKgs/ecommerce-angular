import { Component, input } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { TruncatePipe } from '../../../shared/utils/pipes/truncate.pipe';

@Component({
  selector: 'product-card',
  imports: [TruncatePipe],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {

  product = input.required<Product>()

}