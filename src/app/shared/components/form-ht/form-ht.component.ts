import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FormFieldHT } from '../../types/formFieldHT';
import { DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-form-ht',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    CalendarModule,
    MultiSelectModule,
    FileUploadModule,
    InputMaskModule,
  ],
  providers: [DynamicDialogRef, DynamicDialogConfig],
  templateUrl: './form-ht.component.html',
  styleUrl: './form-ht.component.scss',
})
export class FormHtComponent implements OnInit, AfterViewInit {
  dynamicForm!: FormGroup;
  formFields: FormFieldHT[] = [];
  styleClass: any;
  styleClassToggle: any;
  submitting = true;
  uploadedFiles: any = [];
  constructor(
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    // private formsService: FormsService,
    private sanitizer: DomSanitizer
  ) {
    // this.formFields = this.config.data.formFields;
    this.formFields = [
      {
        name: 'textField',
        type: 'text',
        label: 'Text Field',
        styleClass: { input: 'custom-input' },
        style: { input: { 'background-color': '#f9f9f9' } },
      },
      {
        name: 'numberField',
        type: 'number',
        label: 'Number Field',
        styleClass: { input: 'custom-input' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        validators: [Validators.required],
        urlFile: '',
      },
      {
        name: 'passwordField',
        type: 'password',
        label: 'Password Field',
        styleClass: { input: 'custom-input' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        validators: [Validators.required],
        urlFile: '',
      },
      {
        name: 'phoneNumber',
        type: 'phoneNumber',
        validators: [Validators.required],
        label: 'Phone Number',
        styleClass: { input: 'custom-input' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        preValuePhone: '+216 ',
        placeHolder: '+216 ... ...',
        urlFile: '',
      },
      {
        name: 'checkboxField',
        type: 'checkbox',
        label: 'Checkbox Field',
        validators: [Validators.required],
        styleClass: { input: 'custom-checkbox' },
        style: { input: { 'background-color': '#f9f9f9' } },
        options: [],
        urlFile: '',
      },
      {
        name: 'selectField',
        type: 'select',
        label: 'Select Field',
        filter: true,
        validators: [Validators.required],
        filterBy: 'title',
        // Enable filtering
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
        filter: true,
        filterBy: 'title',
        value: ['option1'],
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
        filter: true,
        filterBy: 'title',
        value: 'option1',
        styleClass: { input: 'custom-select-group' },
        subGroupOptions: 'subGroupOptions',
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
      // {
      //   name: 'radioField',
      //   type: 'radio',
      //   label: 'Radio Field',
      //   options: [
      //     { id: 'option1', title: 'Option 1' },
      //     { id: 'option2', title: 'Option 2' },
      //   ],
      // },
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
    //  this.styleClass = this.config.data.styleClass;
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
      if (this.selectedImages) {
        formData.file = this.selectedImages;
      }

      // this.formsService.emitFormData({
      //   submited: true,
      //   formData: formData,
      // });
      console.log(formData);
    } else {
      this.dynamicForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  onCategoryChange(
    categoryValue: string,
    filedName: string,
    subfiledName: any
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

  preventPrefixDeletion(event: Event, controlName: string, filed: any) {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;

    // Ensure the prefix "+216 " is always present
    if (!currentValue.startsWith(filed.preValuePhone)) {
      const control = this.dynamicForm.get(controlName);
      control?.setValue(
        '+216 ' + currentValue.replace(filed.preValuePhone, '')
      );
      inputElement.value =
        '+216 ' + currentValue.replace(filed.preValuePhone, '');
    }
  }
  selectedImages: File[] = [];
  imagePreviews: (string | ArrayBuffer | null)[] = [];
  isDragging: boolean = false;
  isUploadingImage: boolean = false;
  uploadImageProgress: number = 0;

  onImagesSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    if (files && files.length > 0) {
      this.selectedImages.push(...files);

      for (let file of files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onImageDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onImageDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onImageDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const files = Array.from(event.dataTransfer?.files || []) as File[];
    if (files && files.length > 0) {
      this.selectedImages.push(...files);

      for (let file of files) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  calculSizeFile(file: any) {
    return (file.size / 1024).toFixed(1);
  }
}
