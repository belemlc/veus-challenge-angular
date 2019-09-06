import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'veus-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('page') page: ElementRef;

  productForm: FormGroup;
  products: Array<Product>;
  pagination: any;
  lastPage: Array<number>;
  firstPageUrl: string;
  lastPageUrl: string;
  path: string;
  currentPage: number;
  loading = true;
  emptyList = true;

  constructor(private productService: ProductService) { }

  async ngOnInit() {
    this.getProducts();
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
  }

  async getProducts() {
    this.loading = true;
    const req: any = await this.productService.get().toPromise();
    this.products = req.data;
    this.paginate(req);
    this.loading = false;
    console.log(this.products.length);
  }

  paginate(req: any) {
    this.pagination = req;
    this.lastPage = Array(req.last_page).fill(null).map((x, i) => i + 1);
    this.firstPageUrl = req.first_page_url;
    this.lastPageUrl = req.last_page_url;
    this.path = `${req.path}?page=`;
    this.currentPage = req.current_page;
  }

  async navigate(page: string) {
    this.loading = true;
    const req: any = await this.productService.paginate(page).toPromise();
    this.products = req.data;
    this.paginate(req);
    this.loading = false;
  }

  async delete(product: Product) {
    if (confirm(`Remover o produto ${product.name} ?`)) {
      this.loading = true;
      await this.productService.delete(product.id).toPromise();
      this.products.splice(this.products.indexOf(product), 1);
      alert(`Produto ${product.name} removido com sucesso.`);
      this.loading = false;
    }
  }

  async submit() {
    if ( ! this.productForm.valid) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
    this.loading = true;
    await this.productService.create(this.productForm.value).toPromise();
    alert('Produto adicionado com sucesso.');
    return this.getProducts();
  }

}
