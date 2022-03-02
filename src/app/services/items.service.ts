import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FilterPipe } from '../pipes/filter.pipe';
import { PropFilterPipe } from '../pipes/prop-filter.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  serverLists$:Subject<any>= new BehaviorSubject<any>([]);
  lists$:Subject<any> = new BehaviorSubject<any>([]);
  languages$:Subject<string[]> = new BehaviorSubject<string[]>([]);
  subjects$:Subject<string[]> = new BehaviorSubject<string[]>([]);
  constructor(private httpService:HttpService,
    private propFilterPipe:PropFilterPipe,
    private filetrPipe:FilterPipe,
    private searchPipe:SearchPipe) {
    this.getList();
    this.getLanguages();
    this.getSubjects();
   }

  private getList():void{
    this.httpService.getList().subscribe((res:any)=>{
      this.lists$.next(res);
      this.serverLists$.next(res);
    },
    (err:any)=>{
      console.log(err)
    }
    )
  }

  // get all languages
  private getLanguages():any{
    this.serverLists$.subscribe((res:any)=>{
      const langs = this.propFilterPipe.transform(res,'Version');
      this.languages$.next(langs);
    })
  }

  // get all subject names
  private getSubjects():any{
    this.serverLists$.subscribe(res=>{
      const subjects = this.propFilterPipe.transform(res,'Name');
      this.subjects$.next(subjects);
    })
  }

  // filter data by language name
  getFilterdDataByLanguage(language:string):void{
    this.serverLists$.subscribe((res:any)=>{
      const filteredData = this.filetrPipe.transform(res,'Version',language);
      this.lists$.next(filteredData);
    })
  }

  // filter data by search
  getFilterdDataBySearch(value:string):void{
    this.serverLists$.subscribe((res:any)=>{
      const filteredData = this.searchPipe.transform(res,value);
      this.lists$.next(filteredData);
    })
  }
}
