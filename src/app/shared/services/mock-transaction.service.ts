import {Injectable} from '@angular/core';
import {Account} from '../interfaces/account';


@Injectable({
  providedIn: 'root'
})
export class MockTransactionService {
  customer: Account = {customerName: 'Oskar Olsson', balance: 5000};
  customer2: Account = {customerName: 'Skatteverkets Bank Giro', balance: 0};

  constructor() {
  }

  deposit() {}


  getBalance() {}


  withdraw() {}

  transfer() {}
}
