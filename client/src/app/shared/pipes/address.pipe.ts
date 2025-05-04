import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';
import { count } from 'rxjs';

@Pipe({
  name: 'address',
  standalone: true
})
export class AddressPipe implements PipeTransform {

  transform(value?: ConfirmationToken['shipping'], ...args: unknown[]): unknown {
    if(value?.address && value.name){
      const {line1, line2,state, city, country, postal_code} = value.address;
      return `${value.name}, ${line1}${line2 ? ', '+ line2 : ' '  }, ${city}, ${state}, ${postal_code}, ${country}`;
    } else{
      return 'Unknown address';
    }
  }

}
