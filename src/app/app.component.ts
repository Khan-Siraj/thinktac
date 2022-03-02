import { AfterViewInit, Component } from '@angular/core';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'think-tac';
  constructor(private itemService:ItemsService){}

  ngAfterViewInit(){
    this.itemService.getList();
  }
}
