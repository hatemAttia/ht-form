export interface CrudFormSubmitEvent<T = any> {
    action: 'add' | 'edit';
    data: T;
  }
  
  export interface CrudRowSelectedEvent<T = any> {
    row: T;
  }