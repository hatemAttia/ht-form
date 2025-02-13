import { Validators } from '@angular/forms';
import { FormFieldHT } from '../types/formFieldHT';

export const UserForm = (
  roles: any[],
  shifts: any[],
  user?: any
): FormFieldHT[] => {
  var formFields = [
    {
      label: 'Nom & prénom',
      name: 'fullName',
      type: 'text',
      validators: [Validators.required],
      options: null,
      value: user?.fullName,
      styleClass: {
        label: 'text-primary',
        input: 'border-primary rounded',
      },
      style: {
        label: { fontSize: '14px', fontWeight: 'bold' },
        input: { padding: '10px', border: '2px solid blue' },
      },
    },
    {
      label: 'Matricule',
      name: 'email',
      type: 'text',
      validators: [Validators.required],
      options: null,
      value: user?.email,
    },
    {
      label: 'Téléphone',
      name: 'phoneNumber',
      type: 'phoneNumber',
      validators: [Validators.required],
      options: null,
      value: user?.phoneNumber,
    },

    {
      label: 'Profil',
      name: 'roleId',
      type: 'select',
      validators: [],
      options: roles,
      value: user?.role?.id ? user?.role?.id : null,
      styleClass: {
        label: 'text-primary',
        input: 'border-primary rounded',
      },
      style: {
        label: { fontSize: '14px', fontWeight: 'bold' },
        input: { padding: '10px', border: '2px solid blue' },
      },
    },
    {
      label: 'Shift',
      name: 'shiftId',
      type: 'select',
      validators: [],
      options: shifts,
      value: user?.shift?.id ? user?.shift?.id : null,
    },

    //fffff

    {
      label: 'Upload File',
      name: 'file',
      type: 'file',
      urlFile: user?.image ? `` + user?.image : null,
      validators: [],
      options: null,
      value: null, // No initial value for file input
    },
  ];

  if (!user) {
    formFields.push({
      label: 'mot de passe',
      name: 'password',
      type: 'password',
      validators: [Validators.required],
      options: null,
      value: '',
    });
  } else {
    formFields.push({
      label: 'status',
      name: 'status',
      type: 'checkbox',
      validators: [],
      options: null,
      value: user.status,
    });
  }
  return formFields;
};
