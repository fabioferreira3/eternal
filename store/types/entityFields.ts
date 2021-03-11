export interface OptionalField {
  id: string;
  type: 'attribute|topic';
  title: string;
  value: any;
}

export interface OptionalFieldComponent extends OptionalField {
  element: any;
}
