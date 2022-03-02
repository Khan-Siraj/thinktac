import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], ...args: string[]): any {
    const propName = args[0];
    const lang = args[1];
    if(lang != 'V0'){
      const filterdData:any[] = data.filter(e=>e[propName]==lang);
      return filterdData;
    }else{
      return data;
    }
    
  }

}
