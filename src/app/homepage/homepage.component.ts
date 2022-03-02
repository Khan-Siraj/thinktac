import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  data: any;
  textSkeleton:boolean=true;
  imgSkeleton:boolean=true;
  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.itemsService.lists$.subscribe(res => {
      this.data = res;
    })
  }
}
