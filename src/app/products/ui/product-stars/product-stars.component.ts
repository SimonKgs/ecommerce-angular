import { Component, input } from '@angular/core';
import { Rating } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'product-stars',
  imports: [],
  templateUrl: './product-stars.component.html',
  styleUrl: './product-stars.component.scss'
})
export class ProductStarsComponent {


  productRate = input.required<Rating|undefined>()

}
