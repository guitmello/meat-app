import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private resturantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.resturantsService
      .reviewsOfRestaurant(this.route.parent.snapshot.params['id']);
  }

}
