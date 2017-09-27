import { Pipe, PipeTransform } from '@angular/core';
import { User } from "./user";
import { Poll } from "./poll";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchStr: string): any {
    if (!value) { return value; }

    return value.filter(poll => {
      return poll.user_name.includes(searchStr) || poll.question.includes(searchStr)
    })
  }

}