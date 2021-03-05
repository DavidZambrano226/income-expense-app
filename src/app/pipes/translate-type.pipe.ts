import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateType'
})
export class TranslateTypePipe implements PipeTransform {

  transform(type: string): string {
    if (type === 'income') {
      return 'ingreso';
    } else {
      return 'egreso';
    }
  }

}
