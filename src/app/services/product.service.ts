import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import { Product } from '../models/product';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(
    private firebase: AngularFireDatabase,
    private _toasterservice: ToastrService
  ) { }

  getProducts() {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product){
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
    this._toasterservice.success('Upalala!', 'Registro guardado');
  }

  updateProduct(product: Product){
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
    this._toasterservice.warning('seguro?', 'Registro eliminado');
  }

}
