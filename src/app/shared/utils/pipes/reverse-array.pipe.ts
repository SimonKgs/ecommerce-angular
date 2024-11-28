import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseArray'
})
export class ReversePipe implements PipeTransform {
  transform<T>(array: T[]): T[] {
    if (!Array.isArray(array)) {
      return array; // Return unchanged if it's not an array
    }
    return [...array].reverse(); // Reverse the array
  }
}
