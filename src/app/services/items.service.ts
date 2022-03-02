import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { List } from '../interfaces/list.interface';
import { FilterPipe } from '../pipes/filter.pipe';
import { PropFilterPipe } from '../pipes/prop-filter.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  isLoader$:Subject<boolean> = new BehaviorSubject<boolean>(true);
  serverLists$:Subject<List[]>= new BehaviorSubject<List[]>([]);
  lists$:Subject<List[]> = new BehaviorSubject<List[]>([]);
  languages$:Subject<string[]> = new BehaviorSubject<string[]>([]);
  subjects$:Subject<string[]> = new BehaviorSubject<string[]>([]);
  constructor(private httpService:HttpService,
    private propFilterPipe:PropFilterPipe,
    private filetrPipe:FilterPipe,
    private searchPipe:SearchPipe) {
    this.getLanguages();
    this.getSubjects();
   }

    getList():void{
    this.httpService.getList().subscribe((res:any)=>{
      this.lists$.next(res);
      this.serverLists$.next(res);
      this.isLoader$.next(false);
    },
    (err:any)=>{
      console.log(err)
    }
    )
  }

  // get all languages
  private getLanguages():any{
    this.serverLists$.subscribe((res:any)=>{
      const langs:string[] = this.propFilterPipe.transform(res,'Version');
      this.languages$.next(langs);
    })
  }

  // get all subject names
  private getSubjects():any{
    this.serverLists$.subscribe((res)=>{
      const subjects:string[] = this.propFilterPipe.transform(res,'Name');
      this.subjects$.next(subjects);
    })
  }

  // filter data by language name
  getFilterdDataByLanguage(language:string):void{
    this.serverLists$.subscribe((res:any)=>{
      const filteredData:List[] = this.filetrPipe.transform(res,'Version',language);
      this.lists$.next(filteredData);
    })
  }

  // filter data by search
  getFilterdDataBySearch(value:string):void{
    this.serverLists$.subscribe((res:any)=>{
      const filteredData:List[] = this.searchPipe.transform(res,value);
      this.lists$.next(filteredData);
    })
  }
}
