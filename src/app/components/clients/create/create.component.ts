import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button"
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";

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
  }
}
