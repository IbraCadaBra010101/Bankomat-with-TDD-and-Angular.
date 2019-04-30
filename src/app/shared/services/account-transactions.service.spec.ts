import {TestBed} from '@angular/core/testing';
import {AccountTransactionsService} from './account-transactions.service';
import {BankomatComponent} from '../../bankomat/bankomat.component';

describe('AccountTransactionsService', () => {
  let component: BankomatComponent;
  let service: AccountTransactionsService;
  let spy: any;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AccountTransactionsService);
    service = new AccountTransactionsService();
    component = new BankomatComponent(service);

  });
  afterEach(() => {
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Konto

  // ett konto ska ha ett saldo som är noll eller högre
  it('account should return a balance of 0 or higher', () => {
    service.withdraw(service.customer, 5001);
    expect(service.customer.balance).toBeTruthy(-1);
    expect(service.customer.balance).toEqual(5000);
  });

  // ett konto ska innehålla kundens namn
  it('should contain the customers name', () => {
    expect(service.customer.customerName).toContain('Oskar Olsson');
  });

  it('customer balance should return a number', () => {
    // customer balance type of string
    // interface dictates balance prop is of type number:
    // Refactor value assigned to balance to number inside code.
    expect(service.customer.balance).toEqual(jasmine.any(Number));

  });

  // Saldo
  // det ska finnas en funktion getBalance som returnerar saldot på ett konto
  it(' getbalance should exist upon init', () => {
    // make it fail
    // success?

    expect(service.getBalance).toBeTruthy();
  });
  it('should always return the correct balance', () => {
    expect(service.getBalance(service.customer)).toEqual(5000);

  });

  // Insättning
  // det ska finnas en funktion deposit som hanterar insättningar

  it('deposit should exist when called', () => {
    // init spy on
    spyOn(service, 'deposit');
    service.deposit(service.customer, 1000);
    expect(service.deposit).toHaveBeenCalled();

  });

  // en insättning måste ha ett giltigt konto
  it('deposit should be called with a valid account!', () => {
    spyOn(service, 'deposit');
    service.deposit(service.customer, 1000);
    expect(service.deposit).toBeTruthy();
  });

  // om en insättning inte är giltig ska funktionen kasta ett Error
  // en insättning måste ha ett belopp som är strikt större än noll ändrat till 100 kr
  it('should not allow amount less than 100 kr to be added', () => {
    // this must fail.
    // succeded in depositing negative amount therefore refactor code to throw error if amount is less than 100 kr!
    service.deposit(service.customer, 99);
    // throws error i.e success
    expect(service.customer.balance).toThrowError();
  });
  // om en insättning inte är giltigt ska funktionen kasta ett Error
  // en insättning får inte vara mer än 10.000 kr

  it('should not allow amount more than 10000 to be deposited', () => {
    // must throw error as 10001 is beyond limit
    expect(service.deposit(service.customer, 10001)).toThrowError();
    // success
    expect(service.deposit(service.customer, 10000));

  });


  it('withdraw should exist when called ', () => {
    // initatie spy
    spyOn(service, 'withdraw');
    // run withdraw function from service
    service.withdraw(service.customer, 1000);

    expect(service.withdraw).toHaveBeenCalled();

  });
  // testar ifall rätt mängd tas ut från kontot
  it('should withdraw correct amount of money from account', () => {
    const withdrawal = 1000;
    service.withdraw(service.customer, withdrawal);
    // if success money is withdrawn
    expect(service.customer.balance).toEqual(4000);
  });
  // Kunden ska inte kunna överskrida sitt saldo vid uttag, Kasta Error
  it('should not allow withdrawal higher than that of current balance', () => {
    expect(service.withdraw(service.customer, 5001)).toThrowError();
  });
  //// Minsta tillåtna withdrawal är 100 kr. Kasta error
  it('does not allow a withdrawal less than a 100 kr', () => {
    const c = 99;
    service.withdraw(service.customer, c);
    expect(service.withdraw(service.customer, c)).toThrowError();
    expect(service.withdraw(service.customer, c)).toThrowError();
  });

  // det ska finnas en funktion transfer som hanterar överföringar
  it('transfer should exist when called ', () => {
    spyOn(service, 'transfer');
    service.transfer(service.customer, service.customer2, 1000);
    expect(service.transfer).toHaveBeenCalled();

  });
  // Överföringsbeloppet får inte vara högre än saldot

  it('should not allow transfers higher than existing balance', () => {
    //Crediting account does not have sufficient balance
    service.transfer(service.customer, service.customer2, 5001);
    expect(service.transfer).toThrowError();

  });
  it('should not allow a tranfer of an amount less than a 100 kr', () => {
    service.transfer(service.customer, service.customer2, 99);
    //Error: 99 is not permissible as it is a negative number
    expect(service.transfer).toThrowError();
  });
});
