import { inject, Injectable } from "@angular/core";
import { signalSlice } from 'ngxtension/signal-slice'
import { Product } from "../../shared/interfaces/product.interface";
import { ProductService } from "./products.service";
import { map } from "rxjs";

interface ProductsStateInterface {
    products: Product[];
    status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductsStateService {

    private productService = inject(ProductService)

    private initialState: ProductsStateInterface = {
        products: [],
        status: 'loading' as const,
    };
    
    state = signalSlice({
        initialState: this.initialState,
        // actualiza el estado inicial
        sources: [
            this.productService
                .getProducts()
                .pipe(map((products) => ({ products, status: 'success' as const})))
        ]
    });


}