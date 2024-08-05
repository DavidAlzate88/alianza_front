import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NavComponent} from "./components/utils/nav/nav.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, NavComponent, MatToolbar, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'alianzaFront';
  // displayedColumns:
  //   string[] = ['key', 'id', 'email', 'phone', 'date'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA); // Reemplaza con tus datos reales
}

// Datos de ejemplo (reemplazar con datos reales)
// const ELEMENT_DATA: any[] = [
//   {key: '1', id: '123', email: 'ejemplo@email.com', phone: '123456789', date: '01/01/2024'},
// ];
