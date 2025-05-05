import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { tableConfig } from '../../types/tableConfig.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomActionDef } from '../../types/actionDef.interface';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { FormHtComponent } from '../form-ht/form-ht.component';
import { crudEssentialsConfig } from '../../types/crudEssesntialsConfig.interface';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    FormsModule,
    IconFieldModule,
    DropdownModule,
    InputTextModule,
    InputIconModule,
    TooltipModule,
    ButtonModule
  ],
  providers: [DialogService, ConfirmationService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private confirmationService: ConfirmationService

  ) { }

  @Input() crudEssentialsConfig!: crudEssentialsConfig
  tableConfig: tableConfig | undefined
  @Output() customAction = new EventEmitter<{ action: string, data: any }>();
  @Output() rowEdit = new EventEmitter<any>();
  @Output() rowDelete = new EventEmitter<any>();

  ref: DynamicDialogRef | undefined;

  cols: any[] = [];
  data: any[] = [];

  ngOnInit(): void {
    if (this.crudEssentialsConfig) {
      this.tableConfig = this.crudEssentialsConfig.tableConfig;
    }

    if (this.tableConfig?.columns) {
      this.cols = this.tableConfig.columns
      this.data = this.tableConfig.data || [];
    }
  }

  handleSearch(event: any) {

  }

  get processedActions(): any[] {
    // Add some debugging to verify what's happening

    if (!this.tableConfig?.actions || !Array.isArray(this.tableConfig.actions)) {
      return [];
    }

    const processed = this.tableConfig.actions.map(action => {

      if (typeof action === 'string') {
        // Convert standard action strings to actionDef objects
        if (action === 'edit') {
          const editAction = {
            type: 'edit',
            name: 'Edit',
            icon: 'pi pi-pencil',
            tooltip: 'Edit item',
            action: (rowData: any) => this.handleEdit(rowData),
            visible: () => true  // Make sure it's always visible by default
          };
          console.log('Edit action:', editAction);

          return editAction

        } else if (action === 'delete') {
          return {
            type: 'delete',
            name: 'Delete',
            icon: 'pi pi-trash',
            tooltip: 'Delete item',
            action: (rowData: any) => this.handleDelete(rowData),
            visible: () => true  // Make sure it's always visible by default
          };
        }
      } else if (action && typeof action === 'object') {

        if ((action as CustomActionDef).type === 'custom') {
          // Custom action with component
          const customAction = action as CustomActionDef;
          return {
            ...customAction,
            name: customAction.name || 'Custom',  // Ensure name is set
            action: (rowData: any) => this.openCustomModal(customAction, rowData),
            visible: customAction.visible || (() => true)  // Default visible if not provided
          };
        } else {

          return action;
        }
      }
      return null;
    }).filter(a => a !== null);

    return processed;
  }

  // Handle standard edit action
  handleEdit(rowData: any): void {

    this.ref = this.dialogService.open(FormHtComponent, {
      header: this.tableConfig?.editHeader || 'Edit Item',
      width: this.crudEssentialsConfig.modalWidth || '50%',
      contentStyle: { 'max-height': '100vh', overflow: 'auto' },
      data: {
        fields: this.crudEssentialsConfig.formConfig?.fields.map(field => ({
          ...field,
          value: rowData[field.name]
        })),
        mode: 'edit'
      },
    })

  }

  // Handle standard delete action with confirmation
  handleDelete(rowData: any): void {
    const config = this.tableConfig?.deleteConfirmation || {};

    this.confirmationService.confirm({
      message: config.message || 'Are you sure you want to delete this item?',
      header: config.header || 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: config.acceptLabel || 'Yes',
      rejectLabel: config.rejectLabel || 'No',
      accept: () => {

        this.rowDelete.emit(rowData);

      }
    });
  }

  // Handle custom action with component modal
  openCustomModal(customAction: CustomActionDef, rowData: any): void {
    const ref = this.dialogService.open(customAction.component, {
      data: {
        rowData,
        customData: customAction.data
      },
      header: customAction.name,
      width: '70%'
    });

    ref.onClose.subscribe(result => {
      if (result) {
        this.customAction.emit({
          action: customAction.name,
          data: result
        });
      }
    });
  }

  getButtonSeverity(action: string) {
    switch (action) {
      case 'edit':
        return 'primary';
      case 'delete':
        return 'danger';
      default:
        return 'secondary';
    }
  }



}
