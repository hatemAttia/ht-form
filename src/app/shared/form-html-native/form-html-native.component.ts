import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormFieldHT } from '../types/formFieldHT';
@Component({
  selector: 'app-form-html-native',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form-html-native.component.html',
  styleUrl: './form-html-native.component.scss',
})
export class FormHtmlNativeComponent implements OnInit, AfterViewInit {
  dynamicForm!: FormGroup;
  formFields: FormFieldHT[] = [];
  styleClass: any;
  styleClassToggle: any;
  submitting = true;
  uploadedFiles: any = [];
  searchTerm: { [key: string]: string } = {}; // To store search terms for each select
  filteredOptions: { [key: string]: any[] } = {}; // To store filtered options for each select
  constructor(
    // public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    // public config: DynamicDialogConfig,
    //  private formsService: FormsService,
    private sanitizer: DomSanitizer
  ) {
    this.formFields = [
      {
        name: 'textField',
        type: 'text',
        label: 'Text Field',
        styleClass: { input: 'custom-input' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
      {
        name: 'numberField',
        type: 'number',
        label: 'Number Field',
        styleClass: { input: 'custom-input' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
      {
        name: 'passwordField',
        type: 'password',
        label: 'Password Field',
        styleClass: { input: 'custom-input' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
      {
        name: 'phoneNumber',
        type: 'phoneNumber',
        label: 'Phone Number',
        styleClass: { input: 'custom-input' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
      {
        name: 'checkboxField',
        type: 'checkbox',
        label: 'Checkbox Field',
        styleClass: { input: 'custom-checkbox' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
      {
        name: 'selectField',
        type: 'select',
        label: 'Select Field',
        filter: true, // Enable filtering
        filterBy: 'title', // Enable filtering
        styleClass: { input: 'custom-select' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [
          { id: 'option1', title: 'Option 1' },
          { id: 'option2', title: 'Option 2' },
          { id: 'option3', title: 'Option 3' },
          { id: 'option1', title: 'Option 1' },
          { id: 'option2', title: 'Option 2' },
          { id: 'option3', title: 'Option 3' },
        ],
        urlFile: '',
      },
      {
        name: 'multiselectField',
        type: 'many-select',
        label: 'Multiple Select Field',
        styleClass: { input: 'custom-multiselect' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [
          { id: 'option1', title: 'Option 1' },
          { id: 'option2', title: 'Option 2' },
          { id: 'option3', title: 'Option 3' },
        ],
        urlFile: '',
      },
      {
        name: 'selectGroupField',
        type: 'selectGroup',
        label: 'Select Group Field',
        styleClass: { input: 'custom-select-group' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [
          {
            title: 'Group 1',
            subGroupOptions: [
              { id: 'option1', title: 'Option 1' },
              { id: 'option2', title: 'Option 2' },
            ],
          },
          {
            title: 'Group 2',
            subGroupOptions: [
              { id: 'option3', title: 'Option 3' },
              { id: 'option4', title: 'Option 4' },
            ],
          },
        ],
        urlFile: '',
      },
      {
        name: 'dateField',
        type: 'date',
        label: 'Date Field',
        styleClass: { input: 'custom-date' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
      {
        name: 'timeField',
        type: 'time',
        label: 'Time Field',
        styleClass: { input: 'custom-time' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
      {
        name: 'fileField',
        type: 'file',
        label: 'File Upload Field',
        styleClass: { input: 'custom-file' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
      {
        name: 'radioField',
        type: 'radio',
        label: 'Radio Field',
        options: [
          { id: 'option1', title: 'Option 1' },
          { id: 'option2', title: 'Option 2' },
        ],
      },
      {
        name: 'notShowField',
        type: 'NotShow',
        label: 'Hidden Field',
        styleClass: { input: 'custom-hidden' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
    ];
    //   this.styleClass = this.config.data.styleClass;
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.createForm();
    this.populateSubcategories();
  }

  createForm() {
    const formGroupConfig: any = {};
    this.formFields.forEach((field: FormFieldHT) => {
      if (field.type == 'select')
        formGroupConfig[field.name] = [
          {
            value: field.value?.id ? field.value?.id : field.value,
            disabled: field.disabled,
          },
          field.validators,
        ];
      else {
        formGroupConfig[field.name] = [
          { value: field.value, disabled: field.disabled },
          field.validators,
        ];
      }
    });
    this.dynamicForm = this.formBuilder.group(formGroupConfig);
    console.log(this.dynamicForm.value);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      const formData = this.dynamicForm.getRawValue();

      // Append uploaded files to formData if any
      if (this.uploadedFiles) {
        formData.file = this.uploadedFiles;
      }

      // this.formsService.emitFormData({
      //   submited: true,
      //   formData: formData,
      // });
    } else {
      this.dynamicForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  onCategoryChange(
    categoryValue: string,
    filedName: string,
    subfiledName: string
  ) {
    const categoryField = this.formFields.find(
      (field: any) => field.name === filedName
    );
    const subcategoryField = this.formFields.find(
      (field: any) => field.name === subfiledName
    );

    if (categoryField && subcategoryField) {
      if (categoryField.options) {
        const selectedCategory = categoryField.options.find(
          (category: any) => category.id === categoryValue
        );

        if (selectedCategory) {
          subcategoryField.options = selectedCategory[subfiledName + 's'];
          // this.dynamicForm.get(subfiledName)?.setValue(null);
          // Reset subcategory value
        } else {
          subcategoryField.options = [];
        }
      }
    }
  }

  populateSubcategories() {
    this.formFields.forEach((field: any) => {
      if (field.type === 'multiselect') {
        const initialValue = this.dynamicForm.get(field.name)?.value;
        if (initialValue) {
          const parentFieldName = field.name;
          const subFieldName = field.subOption;
          this.onCategoryChange(initialValue, parentFieldName, subFieldName);
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.styleClassToggle == true) this.updateLayoutClass();
  }

  updateLayoutClass() {
    const modalElement = document.getElementById('container-mod');

    if (modalElement) {
      const modalWidth = modalElement.offsetWidth;

      if (modalWidth < 768) {
        this.styleClass = 'mobile-layout';
      } else if (modalWidth < 992) {
        this.styleClass = 'tablet-layout';
      } else {
        this.styleClass = 'desktop-layout';
      }
    }
  }

  getOptionLabel(option: any): string {
    return option[0]?.title ? 'title' : 'name';
  }

  getFormattedValue(itemField: any): string {
    return [
      itemField?.email,
      itemField?.fullName,
      itemField?.code,
      itemField?.clef,
      itemField?.name,
      itemField?.title,
    ]
      .filter((value) => value)
      .join(' | ');
  }

  FileUploader(event: any) {
    if (event && event.files && event.files.length > 0) {
      this.uploadedFiles = event.files[0];
    }
  }

  preventPrefixDeletion(event: Event, controlName: string) {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;

    // Ensure the prefix "+216 " is always present
    if (!currentValue.startsWith('+216 ')) {
      const control = this.dynamicForm.get(controlName);
      control?.setValue('+216 ' + currentValue.replace('+216 ', ''));
      inputElement.value = '+216 ' + currentValue.replace('+216 ', '');
    }
  }

  // Initialize filtered options
  initializeFilteredOptions() {
    this.formFields.forEach((field: FormFieldHT) => {
      if (field.type === 'select') {
        if (field.options)
          this.filteredOptions[field.name] = [...field.options];
        this.searchTerm[field.name] = ''; // Initialize searchTerm for each field
      }
    });
  }

  // Filter options based on search term
  filterOptions(field: FormFieldHT) {
    const searchTerm = this.searchTerm[field.name]?.toLowerCase() || '';
    if (field.options)
      this.filteredOptions[field.name] = field.options.filter((option) =>
        option.name.toLowerCase().includes(searchTerm)
      );
  }
}
