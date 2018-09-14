import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 8;

  orderId: string;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]
  
  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(10)]
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.emailPattern)]
      }),
      emailConfirmation: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.emailPattern)]
      }),
      adress: new FormControl('', {
        validators: [Validators.required, Validators.minLength(10)]
      }),
      number: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.numberPattern)]
      }),
      optionalAdress: new FormControl(''),
      paymentOption: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      })
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'})
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true}
    } else {
      return undefined
    }
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }
  
  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }
  
  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item:CartItem) => 
      new OrderItem(item.quantity, item.menuItem.id));
    
      this.orderService.checkOrder(order)
      .pipe(
        tap((orderId: string) => {
          this.orderId = orderId
        })
      )
      .subscribe((orderId: string) => {
        this.router.navigate(['order-summary']);
        this.orderService.clear();
      })
    
  }
}