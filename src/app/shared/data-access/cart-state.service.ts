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
            decrease: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                  map((product) => this.decrease(state, product)),
                ),
            remove: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                  map((product) => this.remove(state, product)),
                ),
        }
        
    })

    // para agregar al carrito
    private add(state: Signal<CartState>, product: ProductItemCart) {
        const productInCart = state().products.find(
            (productInCart) => productInCart.product.id === product.product.id
        );

        if (!productInCart) {
            return {
                products: [...state().products, {...product}]
            }
        }

        productInCart.quantity += 1

        return {
            products: [...state().products]
        }
    }


/**
 * Decreases the quantity of a specified product in the cart by 1.
 * If the product is not found in the cart, the cart remains unchanged.
 * If the product quantity is greater than 1, it decrements the quantity.
 * If the product quantity is 1, it removes the product from the cart.
 * 
 * @param state - The current state of the cart.
 * @param product - The product to decrease in quantity.
 * @returns The updated cart state with the product's quantity decreased or removed.
 */
    private decrease(state: Signal<CartState>, product: ProductItemCart) {
        const productInCart = state().products.find(
            (productInCart) => productInCart.product.id === product.product.id
        )

        if (!productInCart) {
            return {
                products: [...state().products ]
            }
        }

        if (productInCart.quantity > 1) {
            productInCart.quantity -= 1
        } else {
            return this.remove(state, product)
        }
        return {
            products: [...state().products]
        }
        
    }
    
    
    /**
     * Removes a specified product from the cart.
     * If the product is not found in the cart, the cart remains unchanged.
     * If the product is found, it removes the product from the cart.
     * 
     * @param state - The current state of the cart.
     * @param product - The product to remove from the cart.
     * @returns The updated cart state with the product removed.
     */
    private remove(state: Signal<CartState>, product: ProductItemCart) {
        return {
            products: state().products.filter(
                (productInCart) => productInCart.product.id !== product.product.id
            )
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

        });
    }

}