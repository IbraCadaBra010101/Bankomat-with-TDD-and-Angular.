export interface Bankservice {
  getBalance(account: Account): number;

  deposit(account: Account, amount: number): void;

  withdraw(account: Account, amount: number): void;

  transfer(from: Account, to: Account, amount: number): void;
}
