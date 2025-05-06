import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { FormHtComponent } from './shared/components/form-ht/form-ht.component';
import { CrudEssentialsComponent } from './shared/components/crud-essentials/crud-essentials.component';
import { crudEssentialsConfig } from './shared/types/crudEssesntialsConfig.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { columnDef } from './shared/types/columnDef.interface';
import { FormFieldHT } from './shared/types/formFieldHT';
import { DetailComponent } from './shared/components/detail/detail.component';
import { CrudFormSubmitEvent } from './shared/types/crudCom.interfaces';
import { User } from './shared/types/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormHtComponent, CrudEssentialsComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  data: any[] = [
    { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', name: 'John Doe', age: 30, email: 'email@exemple.com', phone: '1234567890' },
    { id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Jane Smith', age: 25, email: 'jane.smith@example.com', phone: '9876543210' },
    { id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', name: 'Ahmed Hassan', age: 42, email: 'ahmed.h@example.com', phone: '5551234567' },
    { id: 'c2727d0d-1e5d-4a1b-8d0a-3c0f20551ba4', name: 'Sarah Johnson', age: 33, email: 'sarah.j@example.com', phone: '3337894561' },
    { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', name: 'Mohamed Ali', age: 29, email: 'mohamed.ali@example.com', phone: '7778889999' },
    { id: '36afa2b1-16c0-456d-b4d9-4afaeec53057', name: 'Emma Wilson', age: 38, email: 'emma.w@example.com', phone: '1112223333' },
    { id: '8a319d78-cf56-4e70-96f2-7f9e28d37d35', name: 'Ali Rahman', age: 45, email: 'ali.r@example.com', phone: '4445556666' },
    { id: '7d99e3b4-4d5f-4c6d-8a9e-2b5f81c7cc23', name: 'Olivia Parker', age: 27, email: 'olivia.p@example.com', phone: '8889990000' }
  ];
  cols: columnDef[] = [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age', formatFn: (value: number) => `${value} years` },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone', formatFn: (value: string) => `+216 ${value}` },
  ]

  formFields: FormFieldHT[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      validators: [Validators.required],
      placeHolder: 'Enter full name'
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      validators: [Validators.required, Validators.min(0)],
      placeHolder: 'Enter age'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      validators: [Validators.required, Validators.email],
      placeHolder: 'Enter email address'
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'phoneNumber',
      validators: [Validators.required],
      placeHolder: 'Enter phone number'
    }
  ]

  config: crudEssentialsConfig = {
    enableTable: true,
    tableConfig: {
      columns: this.cols,
      data: this.data,
      enableSort: true,
      enableActions: true,
      actionsHeader: 'Actions',
      actions:  [
        'edit', 
        'delete',
        { 
          type: 'custom', 
          name: 'View Details', 
          icon: 'pi pi-eye', 
          tooltip: 'View Details',
          component: DetailComponent,
          data: { title: 'User Details' }
        }
      ],
    },
    enableAdd: true,
    addHeader: 'Add User',
    modalWidth: '70%',
    formConfig : {
      fields: this.formFields,
      title: 'User Information'
    }
  };

  onUserFormSubmit(event: CrudFormSubmitEvent<User>) {
    if (event.action === 'add') {
      console.log('Adding user:', event.data);
      
    } else if (event.action === 'edit') {
      console.log('Editing user:', event.data);
    }
  }
}
