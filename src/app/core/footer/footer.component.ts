import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatToolbar,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
