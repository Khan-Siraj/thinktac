import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../interfaces/list.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchValue:string): List[] {
    return data.filter((data:any)=>{
      if(data.Name.toLowerCase().match(searchValue.toLowerCase()) != null){
        return data;
      }
    })
  }

}
