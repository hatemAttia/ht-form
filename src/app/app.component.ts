import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { FormHtComponent } from './shared/form-ht/form-ht.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormHtComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
