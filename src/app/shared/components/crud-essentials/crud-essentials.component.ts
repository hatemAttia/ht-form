import { Component, Input, OnInit } from '@angular/core';
import { crudEssentialsConfig } from '../../types/crudEssesntialsConfig.interface';
import { TableComponent } from '../table/table.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-essentials',
  standalone: true,
  imports: [TableComponent, ButtonModule, CommonModule, FormsModule],
  templateUrl: './crud-essentials.component.html',
  styleUrl: './crud-essentials.component.scss'
})
export class CrudEssentialsComponent implements OnInit {

  @Input() crudEssentialsConfig!: crudEssentialsConfig

  constructor() { }

  ngOnInit(): void {
    console.log('CrudEssentialsComponent initialized', this.crudEssentialsConfig);
  }

  showAddDialog() {
    console.log('Add button clicked');
  }

}
