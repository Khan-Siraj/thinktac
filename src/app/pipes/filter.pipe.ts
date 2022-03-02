import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../interfaces/list.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], ...args: string[]):List[] {
    const propName = args[0];
    const lang = args[1];
    if(lang != 'V0'){
      const filterdData:any[] = data.filter((e)=>e[propName]==lang);
      return filterdData;
    }else{
      return data;
    }
    
  }

}
