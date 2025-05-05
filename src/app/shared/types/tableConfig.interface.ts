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
    onDelete?: (rowData: any) => void;

    enableSearch?: boolean;
    enableSort?: boolean;

    enableRowSelect?: boolean;

}