import { Component, effect, inject, input } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../data-access/products.service';
import { tap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDetailStateService } from '../../data-access/product-detail.state.service';
import { ProductStarsComponent } from "../../ui/product-stars/product-stars.component";
import { CartStateService } from '../../../shared/data-access/cart-state.service';

@Component({
  selector: 'app-product-detail',
  imports: [ProductStarsComponent, RouterLink],
  templateUrl: './product-detail.component.html',
  styles: ``,
  providers: [ProductDetailStateService]
})
export default class ProductDetailComponent {

  productDetailState = inject(ProductDetailStateService).state
  cartState = inject(CartStateService).state

  // this will get the param directly from the url
  // to use this previously I need to configure it on the app.config
  // it must have the same name than the router param
  id = input.required<string>();

  constructor(){
    effect(() => {
      console.log(this.id());
      this.productDetailState.getById(this.id())
    })
  }


  addToCart() {
    console.log(this.productDetailState().product);

    const product = this.productDetailState().product

    if(product){
      this.cartState.add({
        product,
        quantity: 1
      })
    }
  }


}
