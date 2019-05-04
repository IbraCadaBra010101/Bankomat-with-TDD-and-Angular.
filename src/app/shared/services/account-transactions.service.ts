import {Injectable} from '@angular/core';
import {Account} from '../interfaces/account';


@Injectable({
  providedIn: 'root'
})
export class AccountTransactionsService {

  customer: Account = {customerName: 'Oskar Olsson', balance: 5000};
  customer2: Account = {customerName: 'Skatteverkets Bank Giro', balance: 300};

  constructor() {
    console.log(this.customer.balance);
  }

  getBalance(account: Account): number {
    if (isNaN(account.balance) || account.balance === null) {
      throw new Error(
        'Account balance is of an invalid type. Should be a number!'
      );
    }
    return account.balance;
  }

  deposit(account: Account, amount: number): void {
    if (account.balance == null || amount === null) {
      throw new Error('Type null is forbidden please use a number');
    }
    if (isNaN(amount)) {
      throw new Error(
        'Deposited amount must be a number'
      );
    }
    if (isNaN(account.balance)) {
      throw new Error('Account balance muste be a number');
    }
    if (amount < 100) {
      throw new Error(
        'Lowest amount permissible is 100 SEK'
      );

    }
    if (amount > 10000) {
      throw new Error(
        'Highest amount permissible is 10000'
      );
    }
    account.balance += amount;
  }

  withdraw(account: Account, amount: number): void {
    if (amount > account.balance) {
      throw new Error('Insufficient balance!');
    }
    if (amount < 100) {
      throw new Error(amount + 'is not a permissible withdrawal. Lowest permissible withdrawal is 100 SEK');

    }

    account.balance -= amount;
  }

  transfer(from: Account, to: Account, amount: number): void {
    if (from.balance == null || to.balance === null || amount === null) {
      throw new Error('Type null is forbidden please use a number');
    }


    if (amount < 100) {
      throw new Error(amount + ' is not a permissible transferal amount');
    }
    if (isNaN(amount)) {
      throw new Error('The transfer amount must be a number');
    }
    if (isNaN(from.balance)) {
      // from.balance == null || to.balance === null
      throw new Error('Incorrect balance.  Account balance must be a number.');

    }


    if (isNaN(to.balance)) {
      throw new Error('Incorrect account balance. Account balance must be a number.');

    }

    if (from.balance < amount) {
      throw new Error('Insufficient balance in transmitting account');

    }
    if (from.balance >= amount && amount > 99) {
      to.balance += amount;
      from.balance -= amount;
    }
  }
}
