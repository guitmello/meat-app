import { MenuItem } from '../menu-item/menu-item.model';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem>

  constructor(private resturantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.resturantsService
      .menuOfRestaurant(this.route.parent.snapshot.params['id']);
  }

  addMenuItem(item: MenuItem) {
    console.log(item);
  }

}
