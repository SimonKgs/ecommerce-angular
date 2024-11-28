import { inject, Injectable } from "@angular/core";
import { signalSlice } from 'ngxtension/signal-slice'
import { Product } from "../../shared/interfaces/product.interface";
import { ProductService } from "./products.service";
import { catchError, map, of, startWith, Subject, switchMap } from "rxjs";

interface ProductsStateInterface {
    products: Product[];
    status: 'loading' | 'success' | 'error';
    page: number;
}

@Injectable()
export class ProductsStateService {

    private productService = inject(ProductService)

    private initialState: ProductsStateInterface = {
        products: [],
        status: 'loading' as const,
        page: 1,
    };

    changePage$ = new Subject<number>();

    loadProducts$ = this.changePage$.pipe(
        startWith(this.initialState.page),
        switchMap((page) => this.productService.getProducts(page)),
        map((products) => ({ products, status: 'success' as const})),
        catchError(() => {
            return of({
                products: [],
                status: 'error' as const,
                page: 1,
            })
        })
    );
    
    state = signalSlice({
        initialState: this.initialState,
        // actualiza el estado inicial
        sources: [
            this.changePage$.pipe(
                map((page) => ({ page, status: 'loading' as const}))
            ),
            this.loadProducts$
        ]
    });


}