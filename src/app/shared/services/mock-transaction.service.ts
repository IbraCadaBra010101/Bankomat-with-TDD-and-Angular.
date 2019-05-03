import {Injectable} from '@angular/core';
import {Account} from '../interfaces/account';
import {AccountTransactionsService} from './account-transactions.service';

@Injectable({
  providedIn: 'root'
})
export class MockTransactionService extends AccountTransactionsService {
  customer: Account = {customerName: 'Oskar Olsson', balance: 5000};
  customer2: Account = {customerName: 'Skatteverkets Bank Giro', balance: 0};

  constructor() {
    super();
  }

  deposit() {
  }


  getBalance() {
    return 0;
  }


  withdraw() {
  }

  transfer() {
  }
}
