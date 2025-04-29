import { columnDef } from "./columnDef.interface";
import { actionDef } from "./actionDef.interface";

export interface tableConfig {

    columns: columnDef[]
    data: any[] | null;

    enableActions?: boolean;
    actions: actionDef[]

    enableSearch?: boolean;
    enableSort?: boolean;

    enableRowSelect?: boolean;

}