import { Injectable } from "@angular/core";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { Observable } from "rxjs";
import { Product } from "../../shared/interfaces/product.interface";

const LIMIT = 6

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseHttpService {

    getProducts(page: number):Observable<Product[]> {
        return this.http.get<Product[]>(`${ this.apiUrl }/products`, {
            params: {
                limit: page * LIMIT
            }
        })
    }
}