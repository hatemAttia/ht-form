import { CustomActionDef, StandardActionType } from "./actionDef.interface";
import { columnDef } from "./columnDef.interface";

export interface tableConfig {

    columns: columnDef[]
    data: any[];

    enableActions?: boolean;
    actionsHeader?: string;
    actions?: (StandardActionType | CustomActionDef)[];

    deleteConfirmation?: {
        message?: string;
        header?: string;
        acceptLabel?: string;
        rejectLabel?: string;
    };

    onEdit?: (rowData: any) => void;
    editHeader?: string;
    onDelete?: (rowData: any) => void;
    deleteHeader?: string;

    enableSearch?: boolean;
    enableSort?: boolean;

    enableRowSelect?: boolean;

}