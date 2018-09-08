import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { InputComponent } from './input/input.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RadioComponent } from './radio/radio.component';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { OrderService } from '../order/order.service';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';

@NgModule({
    declarations: [
        RatingComponent,
        InputComponent,
        RadioComponent,
        SnackbarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RatingComponent,
        InputComponent,
        RadioComponent,
        SnackbarComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService, OrderService, RestaurantsService, NotificationService]
        }
        
    }
}