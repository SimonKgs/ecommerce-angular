import { inject, Injectable, effect, Signal } from '@angular/core';
import { ProductItemCart } from '../interfaces/product.interface';
import { signalSlice } from "ngxtension/signal-slice";
import { StorageService } from './storage.service';
import { map, Observable } from "rxjs";

// manejará el stado del carro
interface CartState {
    products: ProductItemCart[];
    loaded: boolean;
}

@Injectable({
    providedIn: "root"
})
export class CartStateService {
    
    private _storageService = inject(StorageService)

    private initialState: CartState = {
        products: [],
        loaded: false
    }

    // sirve para cargar los productos
    loadProducts$ = this._storageService
    .loadProducts()
    .pipe(
        map((products) => ({products, loaded: true}))
    )

    // le doy un estado inicial
    // despues cargo los productos de la fuente
    // declaro las acciones posibles
    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadProducts$],
        actionSources: {
            add: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                  map((product) => this.add(state, product)),
                ),
        }
        
    })

    // para agregar al carrito
    private add(state: Signal<CartState>, product: ProductItemCart) {
        const isInCart = state().products.find(
            (productInCart) => productInCart.product.id === product.product.id
        );

        if (!isInCart) {
            return {
                products: [...state().products, {...product}]
            }
        }

        isInCart.quantity += 1

        return {
            products: [...state().products]
        }
    }
    
    // los effects del signalSlice estan deprecated now so I need to do natively
    constructor() {
        effect(() => {
          // React to changes in the `products` signal
          const products = this.state.products();
          const loaded = this.state.loaded()

          if (loaded){
            this._storageService.saveProducts(products)
          }
          console.log(products);
          console.log(loaded);
        });
    }

}