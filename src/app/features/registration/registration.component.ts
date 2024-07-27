import { Component } from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {Registration} from "../../shared/interfaces/registration";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatRadioGroup,
    MatRadioButton,
    MatCheckbox,
    MatButton,
    FormsModule,
    MatError,
    MatDivider
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registrationType: number = 3;
  registration: Registration = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    role: '',
    newsletterConsent: false,
    pictureConsent: false
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value)
  }
}
