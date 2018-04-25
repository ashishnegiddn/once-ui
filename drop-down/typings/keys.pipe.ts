import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, value2) {
    let data = value;
    if (value && value instanceof Object && value.constructor === Object) {
      data = Object.keys(value);
    }
    return data;
  }
}
