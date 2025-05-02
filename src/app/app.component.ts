import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { FormHtComponent } from './shared/components/form-ht/form-ht.component';
import { CrudEssentialsComponent } from './shared/components/crud-essentials/crud-essentials.component';
import { crudEssentialsConfig } from './shared/types/crudEssesntialsConfig.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormHtComponent, CrudEssentialsComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  config: crudEssentialsConfig = {
    enableTable: true,
    tableConfig: {
      columns: [
        { field: 'name', header: 'Name' },
        { field: 'age', header: 'Age' },
        { field: 'email', header: 'Email' },
        { field: 'phone', header: 'Phone', formatFn: (value: string) => `+216 ${value}` },
      ],
      data: [
        { name: 'John Doe', age: 30, email: 'email@exemple.com', phone: '1234567890' },
        { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com', phone: '9876543210' },
        { name: 'Ahmed Hassan', age: 42, email: 'ahmed.h@example.com', phone: '5551234567' },
        { name: 'Sarah Johnson', age: 33, email: 'sarah.j@example.com', phone: '3337894561' },
        { name: 'Mohamed Ali', age: 29, email: 'mohamed.ali@example.com', phone: '7778889999' },
        { name: 'Emma Wilson', age: 38, email: 'emma.w@example.com', phone: '1112223333' },
        { name: 'Ali Rahman', age: 45, email: 'ali.r@example.com', phone: '4445556666' },
        { name: 'Olivia Parker', age: 27, email: 'olivia.p@example.com', phone: '8889990000' }
      ],
      enableSort: true,
    },
    enableAdd: true,
  };
}
