import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { crudEssentialsConfig } from '../../types/crudEssesntialsConfig.interface';
import { TableComponent } from '../table/table.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormHtComponent } from '../form-ht/form-ht.component';
import { CrudCommunicationService } from '../../services/crud-communication.service';
import { CrudFormSubmitEvent } from '../../types/crudCom.interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-crud-essentials',
  standalone: true,
  imports: [TableComponent, ButtonModule, CommonModule, FormsModule],
  providers: [DialogService, CrudCommunicationService],
  templateUrl: './crud-essentials.component.html',
  styleUrl: './crud-essentials.component.scss'
})
export class CrudEssentialsComponent implements OnInit {

  @Input() crudEssentialsConfig!: crudEssentialsConfig
  @Output() formSubmit = new EventEmitter<CrudFormSubmitEvent>();

  ref: DynamicDialogRef | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    public dialogService: DialogService,
    private crudCommService: CrudCommunicationService,
  ) { }

  ngOnInit(): void {
    console.log('CrudEssentialsComponent initialized', this.crudEssentialsConfig);

    this.crudCommService
      .on<CrudFormSubmitEvent>('formSubmit')
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        this.formSubmit.emit(event); 
      });
  }

  showAddDialog() {
    console.log(this.crudEssentialsConfig.formConfig?.fields);
    
    this.ref = this.dialogService.open(FormHtComponent, {
      header: this.crudEssentialsConfig.addHeader || 'Add Item',
      width: this.crudEssentialsConfig.modalWidth || '50%',
      contentStyle: { 'max-height': '100vh', overflow: 'auto' },
      data: {
        fields: this.crudEssentialsConfig.formConfig?.fields,
        mode: 'add',
      },
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
