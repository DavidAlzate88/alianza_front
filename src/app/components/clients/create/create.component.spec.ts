import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CreateComponent } from './create.component';
import {ClientService} from "../../../services/client.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {of, throwError} from "rxjs";
import {By} from "@angular/platform-browser";

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', ['saveClients']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        CreateComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form', fakeAsync(() => {
    // @ts-ignore
    clientServiceSpy.saveClients.and.returnValue(of({}));

    component.clientForm.setValue({
      id: 'newkey',
      phone: '1234567890',
      email: 'newclient@example.com',
      startDate: '01/01/2023',
      endDate: '01/01/2023'
    });

    fixture.detectChanges();

    const submitButton: DebugElement = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();
    tick(); // Esperar a que se complete la llamada al servicio (async)

    expect(clientServiceSpy.saveClients).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith('Client created successfully');
  }));

  it('should show error on invalid submit', () => {
    component.clientForm.setValue({ id: '', phone: '', email: '', startDate: '', endDate: '' });
    fixture.detectChanges();

    const submitButton: DebugElement = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();

    expect(clientServiceSpy.saveClients).not.toHaveBeenCalled();
  });

  it('should handle error from service', fakeAsync(() => {
    clientServiceSpy.saveClients.and.returnValue(throwError(() => new Error('Error creando cliente')));

    component.onSubmit();
    tick(); // Esperar a que se complete la llamada al servicio

    expect(snackBarSpy.open).toHaveBeenCalledWith('Error trying to create client: Error creando cliente');
  }));
});
