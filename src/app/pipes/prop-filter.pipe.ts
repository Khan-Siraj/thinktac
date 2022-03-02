import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propFilter'
})
export class PropFilterPipe implements PipeTransform {

  transform(data: any[], ...args: any[]): any {
    const propName = args[0];
    const propArr:any[] = [];
    data.forEach(e=>{
      propArr.push(e[propName])
    })
    return [... new Set(propArr)];
  }

}
