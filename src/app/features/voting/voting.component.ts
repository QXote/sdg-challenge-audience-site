import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [
    FormsModule,
    MatSlider,
    MatSliderThumb
  ],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss'
})
export class VotingComponent {
  vote1 = 0;
}
