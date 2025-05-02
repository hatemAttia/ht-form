import { columnDef } from "./columnDef.interface";
import { actionDef } from "./actionDef.interface";

export interface tableConfig {

    columns: columnDef[]
    data: any[];

    enableActions?: boolean;
    actionsHeader?: string;
    actions?: actionDef[]

    enableSearch?: boolean;
    enableSort?: boolean;

    enableRowSelect?: boolean;

}