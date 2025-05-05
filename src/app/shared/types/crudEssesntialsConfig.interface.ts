import { formConfig } from './formConfig.interface';
import { FormFieldHT } from './formFieldHT';
import { tableConfig } from './tableConfig.interface';

export interface crudEssentialsConfig {

    enableTable?: boolean;
    tableConfig?: tableConfig;
    enableAdd?: boolean;
    addHeader?: string;
    modalWidth?: string;
    formConfig?: formConfig;

}