import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/list.interface';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  data!: List[];
  textSkeleton:boolean=true;
  imgSkeleton:boolean=true;
  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.itemsService.lists$.subscribe((res:List[]) => {
      this.data = res;
    })
  }
}
