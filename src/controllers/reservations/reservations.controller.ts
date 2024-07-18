import { getReservationById, getReservations, getReservationsByGuestId, getReservationsByPropertyId, createReservation, updateReservationDate, deleteReservation } from "../../repository/reservations.repository";
import { IReservation, IReturnReservation, IReturnReservations } from "../../interfaces/reservations.interface";

export const getReservationsController = async (): Promise<IReturnReservations> => {
  return await getReservations();
}

export const getReservationByIdController = async (id: string): Promise<IReturnReservation | null> => {
  return await getReservationById(id);
}

export const getReservationsByGuestIdController = async (user_id: string): Promise<IReturnReservations> => {
  return await getReservationsByGuestId(user_id);
}

export const getReservationsByPropertyIdController = async (property_id: string): Promise<IReturnReservations> => {
  return await getReservationsByPropertyId(property_id);
}

export const createReservationController = async (reservation: IReservation): Promise<IReturnReservation> => {
  return await createReservation(reservation);
}

export const updateReservationDateController = async (id: string, reservation: Partial<IReservation>): Promise<IReturnReservation> => {
  return await updateReservationDate(id, reservation);
}

export const deleteReservationController = async (id: string): Promise<void> => {
  await deleteReservation(id);
}
