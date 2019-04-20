import { Component, OnInit } from '@angular/core';

// Service
import { ProductService } from '../../../services/product.service';

// Product
import { Product } from '../../../models/product';
import { element } from 'protractor';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor( private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

  onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string){
    this.productService.deleteProduct($key);
  }

}
