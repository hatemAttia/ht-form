export interface FormFieldHT {
  //filed name
  name: string;

  //filed label
  label: string;

  //filed value if exist
  value?: any | null;

  //filed type
  type: string;

  //filed Validators
  validators?: any[];

  //filed disabled
  disabled?: boolean;

  //filed placeholder
  placeHolder?: string;

  //liste options if type is list
  options?: any[] | null;

  // filed mask for phoneNumber
  maskPhoneNumber?: string;

  // pre-value  example +216
  preValuePhone?: string;

  // name of sublist related with other filed options
  subOption?: string;

  //name of
  subGroupOptions?: string | undefined;
  urlFile?: string | null;
  filterBy?: string | null;
  filter?: boolean | null;
  filedValue?: any;

  //style form
  styleClass?: {
    label?: string;
    input?: string;
    checkbox?: string;
    [key: string]: string | undefined;
  };
  style?: {
    label?: { [key: string]: string };
    input?: { [key: string]: string };
    checkbox?: { [key: string]: string };
    [key: string]: { [key: string]: string } | undefined;
  };
}
