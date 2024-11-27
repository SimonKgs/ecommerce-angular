import { Component, inject } from '@angular/core';
import { ProductService } from '../../data-access/products.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styles: '',
  providers: [ProductService]
})
export default class ProductListComponent {

  private productsService = inject(ProductService);

  constructor(){
    this.productsService.getProducts().subscribe((products) => {
      console.log(products);
    })
  }

}
