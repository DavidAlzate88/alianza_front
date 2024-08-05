import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ClientData, ClientsComponent} from './clients.component';
import {ClientService} from "../../../services/client.service";
import {of, throwError} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {ModalComponent} from "../../utils/modal/modal.component";

const ELEMENT_DATA: ClientData[] = [
  { key: 'jgutierrez', id: 'Juliana Gutierrez', email: 'jgutierrez@gmail.com', phone: '3219876543', date: '20/05/2019' },
  { key: 'mmartinez', id: 'Manuel Martinez', email: 'mmartinez@gmail.com', phone: '3219876543', date: '20/05/2019' },
];

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientService: ClientService;
  let snackBar: MatSnackBar;
  let dialog: MatDialog;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientsComponent,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ClientService, useValue: {
            getClients: () => of(ELEMENT_DATA) // Simulamos la respuesta del servicio
          }
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {
            open: () => ({
              afterClosed: () => of({})
            })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientService);
    snackBar = TestBed.inject(MatSnackBar);
    dialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get clients on init', () => {
    expect(component.dataSource.data).toEqual(ELEMENT_DATA);
  });

  it('should filter data on search', () => {
    component.sharedKey = 'jgutierrez'; // Valor de búsqueda
    component.onSearchClick();
    expect(component.dataSource.filteredData.length).toBe(1); // Esperamos un solo resultado
    expect(component.dataSource.filteredData[0].key).toBe('jgutierrez');
  });

  it('should open/close expansion panel on advance search', () => {
    spyOn(component.accordion(), 'openAll').and.callThrough();
    spyOn(component.accordion(), 'closeAll').and.callThrough();

    component.onAdvanceSearch();
    expect(component.panelOpenState).toBeTrue();
    expect(component.accordion().openAll).toHaveBeenCalled();

    component.onAdvanceSearch();
    expect(component.panelOpenState).toBeFalse();
    expect(component.accordion().closeAll).toHaveBeenCalled();
  });

  it('should handle error when getting clients', () => {
    spyOn(clientService, 'getClients').and.returnValue(throwError(() => new Error('API Error')));
    spyOn(snackBar, 'open');

    component.getClients();

    expect(snackBar.open).toHaveBeenCalledWith('Error trying to obtain clients through the rest service.');
  });

  // it('should open dialog on edit click', () => {
  //   spyOn(dialog, 'open').and.callThrough();
  //
  //   const editButton: DebugElement = fixture.debugElement.query(By.css('.btn-edit'));
  //   editButton.triggerEventHandler('click', null);
  //
  //   expect(dialog.open).toHaveBeenCalledWith(ModalComponent, {
  //     width: '500px',
  //     height: '600px',
  //     maxHeight: '65vh',
  //     data: {
  //       title: 'Update client',
  //       client: component.dataSource.data[0] // El primer cliente
  //     }
  //   });
  // });

  // it('should load clients on init', () => {
  //   const mockClientes: ClientData[] = [
  //     { key: '1', id: 'Cliente 1', email: 'client1@example.com', phone: '1234567890', date: '2024-01-01' },
  //   ];
  //   spyOn(clientService, 'getClients').and.returnValue(of(mockClientes));
  //
  //   fixture.detectChanges(); // Simula el ciclo de vida ngOnInit
  //
  //   expect(component.dataSource.data).toEqual(mockClientes);
  // });
});
