import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button"
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import {ClientService} from "../../../services/client.service";
import {ClientData} from "../list/clients.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatButton,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  constructor(private clientService: ClientService,
              private _snackBar: MatSnackBar) {}

  name = new FormControl('');
  clientForm = new FormGroup({
    id: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  onSubmit() {
    console.warn(this.clientForm.value);

    const clientForm: ClientData = {
      id: this.clientForm.value.id ? this.clientForm.value.id: '',
      email: this.clientForm.value.email ? this.clientForm.value.email : '',
      phone: this.clientForm.value.phone ? this.clientForm.value.phone : '',
      date: this.clientForm.value.startDate ? this.clientForm.value.startDate: ''
    };
    this.clientService.saveClients(clientForm).subscribe(
      (clienteCreado) => {
        console.log('Cliente creado:', clienteCreado);
        this._snackBar.open('Cliente creado exitosamente');

      },
      (error) => {
        console.error('Error al crear cliente:', error);
        // Manejar el error de alguna manera
      }
    );
  }
}
