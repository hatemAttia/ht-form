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
import { CrudCommunicationService } from '../../services/crud-communication.service';
import { CrudFormSubmitEvent } from '../../types/crudCom.interfaces';

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
  mode: 'add' | 'edit' = 'add';
  constructor(
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    // private formsService: FormsService,
    private crudComService: CrudCommunicationService,
    private sanitizer: DomSanitizer
  ) {
    // this.formFields = this.config.data.formFields;
    this.formFields = this.config.data.fields;
    this.mode = this.config.data.mode
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {

    this.createForm();

    if(this.config.data.mode == 'edit') {
      this.dynamicForm.addControl('id', this.formBuilder.control(this.config.data.rowData.id, Validators.required));
    }
    
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

      this.crudComService.emit<CrudFormSubmitEvent>('formSubmit', {
        action: this.mode,
        data: formData,
      });
      
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
