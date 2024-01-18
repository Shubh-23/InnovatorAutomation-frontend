import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateformate'
})
export class DateformatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(timestamp: any): any {
    console.log(timestamp);
if (timestamp !=null) {
  return timestamp.slice(0, timestamp.indexOf('T')) + ' ' + timestamp.slice(timestamp.indexOf('T') + 1, timestamp.indexOf('.'));
}

  }




}
