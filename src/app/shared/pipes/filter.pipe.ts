import { Pipe, PipeTransform } from '@angular/core';
import { SpiderModel } from '../../spiders/spider-response.interface';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filter: string) {
    return filter === 'all'
      ? value
      : filter === 'selected'
      ? value.filter(({ selected }: SpiderModel) => selected)
      : value.filter(({ name, selected, ...rest }: SpiderModel) => {
          return rest[filter as keyof typeof rest].length > 0;
        });
  }
}
