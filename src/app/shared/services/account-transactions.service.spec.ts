// import {TestBed} from '@angular/core/testing';
// import {AccountTransactionsService} from './account-transactions.service';
// import {BankomatComponent} from './bankomat/bankomat.component';
//
// describe('AccountTransactionsService', () => {
//   let component: BankomatComponent;
//   let service: AccountTransactionsService;
//   let spy: any;
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.get(AccountTransactionsService);
//     service = new AccountTransactionsService();
//     component = new BankomatComponent(service);
//
//   });
//   afterEach(() => {
//     service = null;
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//
//   // Konto
//
//   // ett konto ska ha ett saldo som är noll eller högre
//   it('account should return a balance of 0 or higher', () => {
//     service.withdraw(service.customer, 5001);
//     expect(service.customer.balance).toBeTruthy(-1);
//     expect(service.customer.balance).toEqual(5000);
//   });
//
//   // ett konto ska innehålla kundens namn
//   it('should contain the customers name', () => {
//     expect(service.customer.customerName).toContain('Fakey Mcfake');
//     expect(service.customer.customerName).toEqual('Oskar Olsson');
//     //test if string is being returned
//     expect(service.customer.customerName).toEqual(jasmine.any(String));
//   });
//   /**en kund kan ha fler än ett konto**/
//   /**en kund kan ha fler än ett konto**/
//   /**en kund kan ha fler än ett konto**/
//   /**en kund kan ha fler än ett konto**/
//   /**en kund kan ha fler än ett konto**/
//
//   it('customer balance should return a number', () => {
//     // customer balance type of string
//     // interface dictates balance prop is of type number:
//     expect(service.customer.balance).toEqual(jasmine.any(String));
//     // Refactor value assigned to balance to number inside code.
//     expect(service.customer.balance).toEqual(jasmine.any(Number));
//
//   });
//
//   // Saldo
//   // det ska finnas en funktion getBalance som returnerar saldot på ett konto
//   it(' getbalance should exist upon init', () => {
//     // make it fail
//     expect(service.getBalance).toBeFalsy();
//     // success?
//
//     expect(service.getBalance).toBeTruthy();
//   });
//   it('should always return the correct balance', () => {
//     const balance = 3000;
//     // Make it fail
//     expect(service.getBalance(service.customer)).toEqual(balance);
//
//     // coded balance is 5000 check if this is what the getBalance function actually returns
//     // Make it fail
//     expect(service.getBalance(service.customer)).toBeFalsy(service.customer.balance);
//     // this should succed
//     expect(service.getBalance(service.customer)).toBeTruthy(service.customer.balance);
//   });
//
//   // Insättning
//   // det ska finnas en funktion deposit som hanterar insättningar
//
//   it('deposit should exist when called', () => {
//     // init spy on
//     spyOn(service, 'deposit');
//     // run the deposit function
//     service.deposit(service.customer, 1000);
//     // sucess if it it is called
//     expect(service.deposit).toHaveBeenCalled();
//     // just to check how many times it was called - should be 1 times
//     // hopefully we receive an error as we expect it to have been called 1 time but in test
//     // calling it 14 times
//     expect(service.deposit).toHaveBeenCalledTimes(14);
//     // Indeed we receive an error as shown below
//     //Expected spy deposit to have been called 14 times. It was called 1 times.
//
//   });
//
//   // en insättning måste ha ett giltigt konto
//   it('deposit should be called with a valid account!', () => {
//     spyOn(service, 'deposit');
//     service.deposit(service.customer, 1000);
//     // make it fail
//     // Expected spy deposit to have been called with [ false ] but actual calls were
//     // [ Object({ customerName: 'Oskar Olsson', balance: 5000 }), 1000 ].
//     expect(service.deposit).toHaveBeenCalledWith(!service.customer);
//     //Fails as we called with to few arguments
//     // Expected spy deposit to have been called with [ Object({ customerName: 'Oskar Olsson', balance: 5000 }) ]
//     // but actual calls were [ Object({ customerName: 'Oskar Olsson', balance: 5000 }), 1000 ].
//
//     expect(service.deposit).toHaveBeenCalledWith(service.customer);
//     // should fail as we called the deposit function with customer NOT customer2
//     expect(service.deposit).toHaveBeenCalledWith(service.customer2);
//
//     // should succed
//     expect(service.deposit).toHaveBeenCalledWith(service.customer, 1000);
//   });
//
//
//   // om en insättning inte är giltigt ska funktionen kasta ett Error
//   // en insättning måste ha ett belopp som är strikt större än noll ändrat till 100 kr
//   it('should not allow amount less than 100 kr to be added', () => {
//     // this must fail.
//     // succeded in depositing negative amount therefore refactor code to throw error if amount is less than 100 kr!
//     service.deposit(service.customer, 99);
//     // throws error i.e success
//     expect(service.customer.balance).toThrowError();
//   });
//   // om en insättning inte är giltigt ska funktionen kasta ett Error
//   // en insättning får inte vara mer än 10.000 kr
//
//   it('should not allow amount more than 10000 to be deposited', () => {
//     // must throw error as 10001 is beyond limit
//     expect(service.deposit(service.customer, 10001)).toThrowError();
//     // success
//     expect(service.deposit(service.customer, 10000));
//
//   });
//
//
//   it('withdraw should exist when called ', () => {
//     // initatie spy
//     spyOn(service, 'withdraw');
//     // run withdraw function from service
//     service.withdraw(service.customer, 1000);
//     // test to see how many times it was called by making it fail
//     //Expected spy withdraw to have been called 15 times. It was called 1 times.
//     expect(service.withdraw).toHaveBeenCalledTimes(15);
//     // expecting this not to give any errors and succed
//     expect(service.withdraw).toHaveBeenCalled();
//
//   });
//   // testar ifall rätt mängd tas ut från kontot
//   it('should withdraw correct amount of money from account', () => {
//     const withdrawal = 1000;
//     service.withdraw(service.customer, withdrawal);
//     // if success money is withdrawn
//     expect(service.customer.balance).toEqual(4000);
//     const anotherWithdrawal = 4000;
//     service.withdraw(service.customer, anotherWithdrawal);
//     expect(service.customer.balance).toEqual(0);
//   });
//   // Kunden ska inte kunna överskrida sitt saldo vid uttag, Kasta Error
//   it('should not allow withdrawal higher than that of current balance', () => {
//     // should not succed
//     // should not succed as withdrawal fails and balance stays the same i.e at 0
//     service.withdraw(service.customer, 5100);
//     expect(service.customer.balance).toEqual(-100);
//     // must refactor code to throw error as invalid withdrawal of 15000 SEK succeds
//
//     //  expecting the withdraw function to throw an error due to insuffienct balance!
//     expect(service.withdraw(service.customer, 120000)).toThrowError();
//   });
//   //// Minsta tillåtna withdrawal är 100 kr. Kasta error
//   it('does not allow a withdrawal less than a 100 kr', () => {
//     const c = 99;
//     service.withdraw(service.customer, c);
//     expect(service.withdraw(service.customer, c)).toThrowError();
//     expect(service.withdraw(service.customer, c)).toThrowError();
//   });
//
//   // det ska finnas en funktion transfer som hanterar överföringar
//   it('transfer should exist when called ', () => {
//     spyOn(service, 'transfer');
//     service.transfer(service.customer, service.customer2, 1000);
//
//     //Expected spy transfer to have been called 15 times. It was called 1 times.
//     expect(service.transfer).toHaveBeenCalledTimes(15);
//
//
//     //Expected spy transfer to have been called with [ 'nonsense', 'mer nonsense' ]
//     // but actual calls were [ Object({ customerName: 'Oskar Olsson', balance: 5000 }),
//     // Object({ customerName: 'Skatteverkets Bank Giro', balance: 0 }), 1000 ].
//     expect(service.transfer).toHaveBeenCalledWith('nonsense', 'mer nonsense');
//
//     expect(service.transfer).toHaveBeenCalled();
//
//   });
//   // Överföringsbeloppet får inte vara högre än saldot
//
//   it('should not allow transfers higher than existing balance', () => {
//     //Crediting account does not have sufficient balance
//     service.transfer(service.customer, service.customer2, 5001);
//     expect(service.transfer).toThrowError();
//
//   });
//   it('should not allow a tranfer of an amount less than a 100 kr', () => {
//     service.transfer(service.customer, service.customer2, 99);
//     //Error: 99 is not permissible as it is a negative number
//     expect(service.transfer).toThrowError();
//   });
// });
