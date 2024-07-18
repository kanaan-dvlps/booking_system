import { createProperty, getProperties, getPropertyById, getPropertyByOwnerId, updatePropertyById, deletePropertyById } from "../../repository/properties.repository";
import { IProperty, IReturnProperty, IReturnProperties, IPropertyUpdate } from "../../interfaces/property.interface";

export async function createPropertyController(property: IProperty): Promise<IReturnProperty> {
  return await createProperty(property);
}

export async function getPropertiesController(): Promise<IReturnProperties> {
  return await getProperties();
}

export async function getPropertyByIdController(id: string): Promise<IReturnProperty> {
  return await getPropertyById(id);
}

export async function getPropertyByOwnerIdController(user_id: string): Promise<IReturnProperties> {
  return await getPropertyByOwnerId(user_id);
}

export async function updatePropertyByIdController(id: string, property: IPropertyUpdate): Promise<IReturnProperty> {
  return await updatePropertyById(id, property);
}

export async function deletePropertyByIdController(id: string): Promise<IReturnProperty> {
  return await deletePropertyById(id);
}
