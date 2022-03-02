import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchValue:string): unknown {
    return data.filter((data:any)=>{
      if(data.Name.toLowerCase().match(searchValue.toLowerCase()) != null){
        return data;
      }
    })
  }

}
