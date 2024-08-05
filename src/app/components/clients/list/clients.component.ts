import {Component, inject, OnInit, signal, ViewChild, viewChild} from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  MatDialog,
} from "@angular/material/dialog";
import { CreateComponent } from "../create/create.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { ModalComponent } from "../../utils/modal/modal.component";
import { FormsModule } from "@angular/forms";
import { ClientService } from "../../../services/client.service";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface ClientData {
  key?: string;
  id: string;
  email: string;
  phone: string;
  date: string;
}

const ELEMENT_DATA: ClientData[] = [
  { key: 'jgutierrez', id: 'Juliana Gutierrez', email: 'jgutierrez@gmail.com', phone: '3219876543', date: '20/05/2019' },
  { key: 'mmartinez', id: 'Manuel Martinez', email: 'mmartinez@gmail.com', phone: '3219876543', date: '20/05/2019' },
  { key: 'aruiz', id: 'Ana Ruiz', email: 'aruiz@gmail.com', phone: '3219876543', date: '20/05/2019' },
  { key: 'ogarcia', id: 'Oscar Garcia', email: 'ogarcia@gmail.com', phone: '3219876543', date: '20/05/2019' },
  { key: 'tramos', id: 'Tania Ramos', email: 'tramos@gmail.com', phone: '3219876543', date: '20/05/2019' },
  { key: 'cariza', id: 'Carlos Ariza', email: 'cariza@gmail.com', phone: '3219876543', date: '20/05/2019' },
  { key: 'rvillaneda', id: 'Rodrigo Villaneda', email: 'rvillaneda@gmail.com', phone: '3219876543', date: '20/05/2019' },
  { key: 'mfonseca', id: 'Mauricio Fonseca', email: 'mfonseca@gmail.com', phone: '3219876543', date: '20/05/2019' },
];

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTableModule,
    CreateComponent,
    FormsModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['key', 'id', 'email', 'phone', 'date', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatTable) table!: MatTable<ClientData>;

  constructor(private clientService: ClientService,
              private _snackBar: MatSnackBar) {} // Inyectar el servicio

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe(
      (clients: ClientData[]) => {
        this.dataSource.data = clients;
      },
      (error) => {
        const message = 'Error trying to obtain clients through the rest service.'
        console.error(message, error.message);
        this._snackBar.open(message);
      }
    );
  }


  panelOpenState = false;
  accordion = viewChild.required(MatAccordion);

  readonly dialog = inject(MatDialog);
  readonly client = signal('');
  sharedKey: string = '';

  onNewClick() {
    console.info("New button clicked!");
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px', // Ancho
      height: '600px', // Alto
      maxHeight: '65vh', // Alto máximo (porcentaje de la altura de la pantalla)
      data: {
        title: 'Create new client',
        client: this.client()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.info('The dialog was closed');
      if (result !== undefined) {
        this.client.set(result);
      }
    });
  }

  onExportClick() {
    // Lógica para manejar el clic en el botón "Export"
    console.info("Export button clicked!");
  }

  onEditClick(element: ClientData) {
    // Lógica para manejar el clic en el botón "Edit"
    console.info("Edit clicked!", element);
  }

  onSearchClick() {
    console.info("Search button clicked!", this.sharedKey);
    this.dataSource.filter = this.sharedKey.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAdvanceSearch() {
    // Lógica para manejar el clic en el botón "Búsqueda"
    this.panelOpenState = !this.panelOpenState;
    console.info("Búsqueda avanzada clicked!", this.panelOpenState);
    if (this.panelOpenState) {
      console.info('open panel open');
      this.accordion().openAll();
    } else {
      console.info('panel close')
      this.accordion().closeAll();
    }
  }
}
