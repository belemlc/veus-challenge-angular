import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'veus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Veus Shopping';

  constructor(private productService: ProductService) {
    this.productService.auth().then((data: any) => localStorage.setItem('token', data.token));
  }
}
