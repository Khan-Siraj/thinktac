import { AfterViewInit, Component } from '@angular/core';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'think-tac';
  isLoader!:boolean;
  constructor(private itemService:ItemsService){
    this.itemService.isLoader$.subscribe(res=>this.isLoader=res);
  }

  ngAfterViewInit(){
    this.itemService.getList();
  }
}
