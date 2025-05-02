export interface columnDef {

    field: string;
    header?: string;
    type?: string;
    sortable?: boolean;
    filterable?: boolean;
    hidden?: boolean;
    searchable?: boolean;
    width?: string;
    order?: number;
    formatFn?: (value: any, row?: any) => string;

}