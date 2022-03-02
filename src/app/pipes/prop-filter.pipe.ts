import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../interfaces/list.interface';

@Pipe({
  name: 'propFilter'
})
export class PropFilterPipe implements PipeTransform {

  transform(data: any[], ...args: any[]): string[] {
    const propName = args[0];
    const propArr:any[] = [];
    data.forEach(e=>{
      propArr.push(e[propName])
    })
    return [... new Set(propArr)];
  }

}
