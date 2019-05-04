import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {BankomatComponent} from './bankomat.component';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
// import {AccountTransactionsService} from '../shared/services/account-transactions.service';
import {DebugElement} from '@angular/core';
import {MockTransactionService} from '../shared/services/mock-transaction.service';

describe('BankomatComponent', () => {
  let component: BankomatComponent;
  let service: MockTransactionService;
  let fixture: ComponentFixture<BankomatComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BankomatComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    service = new MockTransactionService();
    component = new BankomatComponent(service);
    fixture = TestBed.createComponent(BankomatComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    service = null;
    component = null;
  });
  //MOCKING
  // det ska finnas en komponent med namnet Bank
  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // hämta saldot
  it('it should call getBalance()', () => {
    // jasmine.createSpy('withdraw');
    spyOn(service, 'getBalance');
    service.getBalance();
    expect(service.getBalance).toHaveBeenCalled();
  });


  // göra insättning
  it('should call deposit', () => {
    spyOn(service, 'deposit');
    service.deposit();
    expect(service.deposit).toHaveBeenCalled();
  });

  // göra uttag
  it('should call withdraw ', () => {
    spyOn(service, 'withdraw');
    service.withdraw();
    expect(service.withdraw).toHaveBeenCalled();
  });

  // överföring
  it('should call transfer with fake amount', () => {
    spyOn(service, 'transfer');
    service.transfer();
    expect(service.transfer).toHaveBeenCalled();
  });
  // TESTAR KOMPONENTENS KRAV SPEC
  // komponenten ska kunna visa ett konto
  it('should show a customers name on DOM as part of customers account', () => {
    let accountNameOnDOM: DebugElement[];
    accountNameOnDOM = fixture.debugElement.queryAll(By.css('p'));
    fixture.detectChanges();
    const customerBalance = accountNameOnDOM[0].nativeElement;
    expect(customerBalance.innerHTML).toContain(service.customer.customerName);
  });
  // komponenten ska kunna visa ett konto
  it('should show a customers balance on DOM as part of customers account ', () => {
    let accountBalanceOnDOM: DebugElement[];
    accountBalanceOnDOM = fixture.debugElement.queryAll(By.css('p'));
    fixture.detectChanges();
    const customerBalance = accountBalanceOnDOM[1].nativeElement;
    expect(customerBalance.innerHTML).toContain(service.customer.balance);
  });
  // den ska visa saldot i ett DOM-element som har CSS-klassen "accountBalance"
  it('should show balance in DOM-element with CSS class name "accountBalance"', () => {
    let balanceOnDOM: DebugElement;
    balanceOnDOM = fixture.debugElement.query(By.css('.accountBalance'));
    fixture.detectChanges();
    const balanceEl = balanceOnDOM.nativeElement;
    expect(balanceEl.innerHTML).toEqual('Customer balance: ' + service.customer.balance + ' SEK');
  });

  // det ska finnas ett textfält där användaren kan skriva in ett belopp
  it('should have a text input field to allow the user to input a sum', () => {
    let textInputFieldOnDOM: DebugElement[];
    textInputFieldOnDOM = fixture.debugElement.queryAll(By.css('input'));
    fixture.detectChanges();
    // deposit
    expect(textInputFieldOnDOM[0]).toBeTruthy();
    // transfer
    expect(textInputFieldOnDOM[1]).toBeTruthy();
    // withdraw
    expect(textInputFieldOnDOM[2]).toBeTruthy();
  });

  // det ska finnas en funktion som kan köras för att sätta in det inskrivna beloppet på kontot
  it('should have a function to deposit sum of money ', () => {
    expect(component.depositMoney(1000)).toBeTruthy();
  });
  // det ska finnas en knapp som kör funktionen deposit när man klickar på den
  it('should have a button that runs deposit() if clicked', () => {
    spyOn(component, 'depositMoney');
    const allButtons = fixture.debugElement.queryAll(By.css('button'));
    const depositButton = allButtons[0];
    depositButton.triggerEventHandler('click', null);
    expect(component.depositMoney).toHaveBeenCalled();
  });

  // det ska finnas en funktion som kan köras för att ta ut det inskrivna beloppet från kontot
  it('should have a function to withdraw a sum ', () => {
    expect(component.withdraw(3000)).toBeTruthy();
  });
  it('should have a button that runs withdraw() if clicked', () => {
    spyOn(component, 'withdraw');
    const allButtons = fixture.debugElement.queryAll(By.css('button'));
    const withdrawButton = allButtons[1];
    withdrawButton.triggerEventHandler('click', null);
    expect(component.withdraw).toHaveBeenCalled();
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
// });```
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
