import {TestBed} from '@angular/core/testing';
import {AccountTransactionsService} from './account-transactions.service';
import {BankomatComponent} from '../../bankomat/bankomat.component';


describe('AccountTransactionsService', () => {
  let component: BankomatComponent;
  let service: AccountTransactionsService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AccountTransactionsService);
    service = new AccountTransactionsService();
    component = new BankomatComponent(service);
  });

  afterEach(() => {
    service = null;
  });
  //
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Konto

  // ett konto ska ha ett saldo som är noll eller högre
  it('account should return a balance of 0 or higher', () => {
    service.withdraw(service.customer, 5000);
    expect(service.customer.balance).toEqual(0);
  });
  //
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

  // // Saldo
  // det ska finnas en funktion getBalance som returnerar saldot på ett konto

  // 3 Du har testat att getBalance finns och returnerar rätt värde för ett utvalt testkonto.
  // Men vad ska getBalance gör om det är ett felaktigt konto? Vad händer om man råkar skicka
  // `null` eller något annat till funktionen?
  // _Lägg till testfall som testar att getBalance gör rätt saker för felaktiga värden på parametern._

  it(' getbalance should exist', () => {
    expect(service.getBalance).toBeDefined();
  });
  it('should always return the correct balance', () => {
    const testingNameWithWrongValue = {customerName: 'Jim', balance: null};
    expect(() => {
      service.getBalance(testingNameWithWrongValue);
    }).toThrow();

    const testingBalanceWithWrongValue = {customerName: 'name', balance: NaN};
    expect(() => {
        service.getBalance(testingBalanceWithWrongValue);
      }
    ).toThrow();
  });

  // 4 "deposit should exist when called" - börja med att testa "deposit should exist".
  // Sedan kan man testa att rätt saker händer när den anropas.
  //   Samma sak gäller för withdraw och transfer.

  // Insättning


  // det ska finnas en funktion deposit som hanterar insättningar
  it('deposit should exist', () => {
    // init spy on
    spyOn(service, 'deposit');
    service.deposit(service.customer, 1000);
    expect(service.deposit).toBeDefined();
  });

  // 5 Du har testat att deposit finns. Men du behöver testa att deposit kan göra rätt.
  // Vad ska hända med kontot om alla parametrar och ok? Det är det förväntade utfallet, som man behöver
  // testa med expect. Sedan behöver du testa vad som händer om parametrarna inte är ok.

  it('there should be a deposit function which handles deposits', () => {

    // correct parameters for amount
    // Vad ska hända med kontot om alla parametrar och ok? Det är det förväntade utfallet, som man behöver
    service.deposit(service.customer, 230);
    expect(service.customer.balance).toEqual(5230);

    // incorrect parameters for amount
    //  Sedan behöver du testa vad som händer om parametrarna inte är ok.

    expect(() => {
      service.deposit(service.customer, null);
    }).toThrow();
    //  Sedan behöver du testa vad som händer om parametrarna inte är ok.

    expect(() => {
      service.deposit(service.customer, null);
    }).toThrow();
    //  Sedan behöver du testa vad som händer om parametrarna inte är ok.

    //  Sedan behöver du testa vad som händer om parametrarna inte är ok.

    // incorrect parameters for account balance
    const account = {customerName: 'john', balance: null};
    expect(() => {
      service.deposit(account, 1233);
    }).toThrow();
    //  Sedan behöver du testa vad som händer om parametrarna inte är ok.

    // incorrect parameters for account name
    const account2 = {customerName: null, balance: 5000};
    expect(() => {
      service.deposit(account2, 1000);
    }).toThrow();

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

    // throws error i.e success
    expect(() => {
      service.deposit(service.customer, 99);
    }).toThrowError();
  });
  // om en insättning inte är giltigt ska funktionen kasta ett Error
  // en insättning får inte vara mer än 10.000 kr

  it('should not allow amount more than 10000 to be deposited', () => {
    // must throw error as 10001 is beyond limit
    expect(() => {
      service.deposit(service.customer, 10001);
    }).toThrowError();
  });


  it('withdraw should exist', () => {
    // initatie spy
    spyOn(service, 'withdraw');
    // run withdraw function from service
    service.withdraw(service.customer, 1000);
    expect(service.withdraw).toBeDefined();

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
    expect(() => {
      service.withdraw(service.customer, 5001);
    }).toThrowError();
  });
  // Minsta tillåtna withdrawal är 100 kr. Kasta error
  it('does not allow a withdrawal less than a 100 kr', () => {
    expect(() => {
      service.withdraw(service.customer, 99);
    }).toThrowError();
  });

  // det ska finnas en funktion transfer som hanterar överföringar
  it('transfer should exist', () => {
    spyOn(service, 'transfer');
    service.transfer(service.customer, service.customer2, 1000);
    expect(service.transfer).toBeDefined();
  });

  // 7 Det finns inget testfall som kontrollerar att transfer gör rätt, om parametrarna är ok.
//   Parametrarna kan vara fel på flera sätt än du har testat.

  it('there should be function called transfer which handles transfers', () => {

    const account5 = {customerName: 'Jim', balance: NaN};
    const account2 = {customerName: 'Jim', balance: null};
    const accountSending = {customerName: 'Jim', balance: 5000};

    // incorrect parameter balance in sending account null
    expect(() => {
      service.transfer(account2, service.customer, 200);
    }).toThrow();
    //  incorrect parameter balance in sending account NaN
    expect(() => {
      service.transfer(account5, service.customer, 200);
    }).toThrow();

    //  incorrect parameter balance in receving account NaN
    expect(() => {
      service.transfer(accountSending, account5, 100);
    }).toThrow();
    //  incorrect parameter balance in receving account null
    expect(() => {
      service.transfer(service.customer, account2, 100);
    }).toThrow();


    //incorrect parameters amount
    const wrong = null;
    expect(() => {
      service.transfer(accountSending, service.customer, wrong);
    }).toThrow();
    const wrongAgain = NaN;
    expect(() => {
      service.transfer(accountSending, service.customer, wrongAgain);
    }).toThrow();
    const veryWrong = 99;
    expect(() => {
      service.transfer(accountSending, service.customer, veryWrong);
    }).toThrow();
  });
  // Överföringsbeloppet får inte vara högre än saldot

  it('should not allow transfers higher than existing balance', () => {
    //Crediting account does not have sufficient balance
    expect(() => {
      service.transfer(service.customer, service.customer2, 5001);
    }).toThrowError();

  });
  it('should not allow a tranfer of an amount less than a 100 kr', () => {
    // service.transfer();
    expect(() => {
      service.transfer(service.customer, service.customer2, 88);
    }).toThrowError();
  });
});


//
//
// Kommentarer på uppgiften:
//
//   *Servicen*
// 1 Man kan använda `describe` för att gruppera liknande tester.
// Det blir enklare att läsa då. Så här:
//   ```describe('MyService', () => {
//    describe('getBalance', () => {
//       it('should be created', () => ...
//    });
//
//    describe('deposit', () => {
//       it...  // osv
//    });
// });
//
// 2 Poängen med kraven på ett _konto_ är att man behöver veta vad ett konto är
// för att testa getBalance, deposit, withdraw och transfer. Man behöver inte testa Account specifikt.
//
// 3 Du har testat att getBalance finns och returnerar rätt värde för ett utvalt testkonto.
// Men vad ska getBalance gör om det är ett felaktigt konto? Vad händer om man råkar skicka
// `null` eller något annat till funktionen?
// _Lägg till testfall som testar att getBalance gör rätt saker för felaktiga värden på parametern._
//
// 4 "deposit should exist when called" - börja med att testa "deposit should exist".
// Sedan kan man testa att rätt saker händer när den anropas.
//   Samma sak gäller för withdraw och transfer.
//
// 5 Du har testat att deposit finns. Men du behöver testa att deposit kan göra rätt.
// Vad ska hända med kontot om alla parametrar och ok? Det är det förväntade utfallet, som man behöver
// testa med expect. Sedan behöver du testa vad som händer om parametrarna inte är ok.
//
// 6 Tips. I stället för att lägga ett konto i servicen kan man skapa det direkt i testfallen, när du behöver det:
//   ```let testAccount = { customerName: 'Nalle Puh', balance: 12345 };```
//
// 7 Det finns inget testfall som kontrollerar att transfer gör rätt, om parametrarna är ok.
//   Parametrarna kan vara fel på flera sätt än du har testat.
//
// *Komponenten*
// 8 Testet "it should call getBalance" _testar servicen, inte komponenten!_ Servicen testas
// i sin egen testfil, det ska man inte göra igen. Samma sak med "it should call deposit/withdraw/transfer".
// Inget av de testfallen ingår inte i kravspecen för komponenten.
// Man testar inte sina mocks, det blir dubbelarbete. Ta bort testfallen.
//
// 9 Testet "should show a customers name on DOM as part of customers account" är ok.
// Men det är riskabelt att testet är beroende av att saldot ska visas i den första p-taggen.
// Är det verkligen inte ok att flytta runt elementen på sidan? För att göra sin app robust bör man använda CSS-klasser på element
// som man behöver plocka ut ur DOM. Då spelar inte ordningen någon roll längre.
//
//
//   Testfallen för komponenten är ok, de behöver du inte ändra på. Men jag vill att du kompletterar
//   testfallen för servicen enligt punkterna 3, 4, 5 och 7.
