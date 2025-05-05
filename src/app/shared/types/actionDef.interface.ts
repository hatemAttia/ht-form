import { Type } from "@angular/core";

export type StandardActionType = 'edit' | 'delete';

export interface CustomActionDef {
    type: 'custom';
    name: string;
    icon: string;
    component: Type<any>;
    data?: any;
    tooltip?: string;
    disabled?: (rowData: any) => boolean;
    visible?: (rowData: any) => boolean;
}