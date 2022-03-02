import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilterPipe } from '../pipes/filter.pipe';
import { ItemsService } from '../services/items.service';
import {startWith, map, debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  data:any;
  language:string="";
  langsArr:string[]=[]
  control = new FormControl();
  subjects:string[]=[];
  subjectName:Observable<any[]>;
  constructor(private itemsService:ItemsService) {
   this.subjectName=this.control.valueChanges.pipe(
      map(value => this._filter(value)),
    );
   }

  ngOnInit(): void {
    this.itemsService.lists$.subscribe(res=>this.data=res);
    this.itemsService.languages$.subscribe(res=>this.langsArr=res);
    this.itemsService.subjects$.subscribe(res=>this.subjects=res);
    // search 
    this.control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(res=>{
      this.itemsService.getFilterdDataBySearch(res);
    })
  }

  filterList():void{
   this.itemsService.getFilterdDataByLanguage(this.language);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.subjects.filter((e:any) => this._normalizeValue(e).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  
}
