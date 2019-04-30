import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {BankomatComponent} from './bankomat.component';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {AccountTransactionsService} from '../shared/services/account-transactions.service';
import {DebugElement} from '@angular/core';
import {MockTransactionService} from "../shared/services/mock-transaction.service";

describe('BankomatComponent', () => {
  let component: BankomatComponent;
  let service: AccountTransactionsService;
  let fixture: ComponentFixture<BankomatComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BankomatComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    service = new AccountTransactionsService();
    component = new BankomatComponent(service);
    fixture = TestBed.createComponent(BankomatComponent);
    // create component and test fixture
    component = fixture.componentInstance;

  });
  afterEach(() => {
    service = null;
    component = null;
  });
  // MOCKING
  // // det ska finnas en komponent med namnet Bank
  // it('should create the app', () => {
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });
  // // hämta saldot
  // it('it should call getBalance()', () => {
  //   // jasmine.createSpy('withdraw');
  //   spyOn(service, 'getBalance');
  //   service.getBalance();
  //   expect(service.getBalance).toHaveBeenCalled();
  // });
  //
  //
  // // göra insättning
  // it('should call deposit', () => {
  //   spyOn(service, 'deposit');
  //   service.deposit();
  //   expect(service.deposit).toHaveBeenCalled();
  // });
  //
  // // göra uttag
  // it('should call withdraw ', () => {
  //   spyOn(service, 'withdraw');
  //   service.withdraw();
  //   expect(service.withdraw).toHaveBeenCalled();
  // });
  //
  // // överföring
  // it('should call transfer with fake amount', () => {
  //   spyOn(service, 'transfer');
  //   service.transfer();
  //   expect(service.transfer).toHaveBeenCalled();
  // });
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
    //withdraw
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
