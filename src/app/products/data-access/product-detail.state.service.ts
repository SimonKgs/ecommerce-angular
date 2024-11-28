import { inject, Injectable } from "@angular/core";
import { signalSlice } from 'ngxtension/signal-slice'
import { Product } from "../../shared/interfaces/product.interface";
import { ProductService } from "./products.service";
import { catchError, map, Observable, of, startWith, Subject, switchMap } from "rxjs";

interface ProductsStateInterface {
    product: Product | undefined;
    status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductDetailStateService {

    private productService = inject(ProductService)

    private initialState: ProductsStateInterface = {
        product: undefined,
        status: 'loading' as const,
    };
    
    state = signalSlice({
        initialState: this.initialState,
        // defino las actions del servicio
        actionSources: {
            getById: (_state, action$: Observable<string>) => 
                action$.pipe(
                    switchMap((id) => this.productService.getProductById(id)),
                    map((data) => ({ product: data, status: 'success' as const}))
                ),
            
        }
    });


}