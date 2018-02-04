import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'row'
})
export class RowPipe implements PipeTransform {
  transform(items: any[], row: number): any[] {
    return items.filter(item => item.row === row);
  }
}
