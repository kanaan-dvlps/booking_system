export interface IReturnProperty {
  id: number;
  name: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};

export interface IReturnProperties {
  properties: IReturnProperty[];
}

export interface IProperty {
  name: string;
  user_id: string;
}

export interface IPropertyUpdate {
  name: string;
}
