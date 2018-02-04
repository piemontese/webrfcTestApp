import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {
  transform(items: any[], position: string): any[] {
    return items.filter(item => item.position === position);
  }
}
