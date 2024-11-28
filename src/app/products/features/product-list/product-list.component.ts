import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access/products-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { ReversePipe } from '../../../shared/utils/pipes/reverse-array.pipe';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, ReversePipe],
  templateUrl: './product-list.component.html',
  styles: '',
  providers: [ProductsStateService]
})
export default class ProductListComponent {


  productsState = inject(ProductsStateService)

  changePage() {
    const nextPage = this.productsState.state().page + 1 
    this.productsState.changePage$.next(nextPage)
  }
  

}
