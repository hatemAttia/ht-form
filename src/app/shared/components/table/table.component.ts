import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { tableConfig } from '../../types/tableConfig.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { DialogService } from 'primeng/dynamicdialog';



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
  ],
  providers: [DialogService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  constructor(
    private dialogService: DialogService
  ) { }

  @Input() tableConfig: tableConfig | undefined

  cols: any[] = [];
  data: any[] = [];

  ngOnInit(): void {


    if (this.tableConfig?.columns) {
      console.log('TableComponent initialized with config:', this.tableConfig);

      this.cols = this.tableConfig.columns
      this.data = this.tableConfig.data || [];
    }
  }

  handleSearch(event: any) {

  }

}
