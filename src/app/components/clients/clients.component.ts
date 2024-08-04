import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatGridList, MatGridListModule, MatGridTile, MatGridTileText} from "@angular/material/grid-list";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatFabButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

export interface UserData {
  key: string;
  id: number;
  email: string;
  phone: string;
  date: string;
}

const ELEMENT_DATA: UserData[] = [
  {key: '1', id: 1, email: 'user1@example.com', phone: '123-456-7890', date: '2024-08-04'},
  {key: '2', id: 2, email: 'user2@example.com', phone: '987-654-3210', date: '2024-08-03'},
  // ... más datos si es necesario
];

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatIconModule ,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  displayedColumns: string[] = ['key', 'id', 'email', 'phone', 'date'];
  dataSource = ELEMENT_DATA;

  onNewClick() {
    // Lógica para manejar el clic en el botón "New"
    console.log("New button clicked!");
  }

  onExportClick() {
    // Lógica para manejar el clic en el botón "Export"
    console.log("Export button clicked!");
  }

  onAdvancedSearchClick() {
    // Lógica para manejar el clic en el botón "Búsqueda Avanzada"
    console.log("Búsqueda Avanzada clicked!");
  }

  clearSearch() {
    // Lógica para limpiar el campo de búsqueda
  }
}
