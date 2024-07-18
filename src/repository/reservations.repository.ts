import { IReturnReservation, IReturnReservations, IReservation } from "../interfaces/reservations.interface";
import { getDatabaseConnection } from "../configs/databaseInitializer";
import { Tables } from "../database/constants/table.constant";

export const getReservationById = async (id: string): Promise<IReturnReservation | null> => {
  const knex = getDatabaseConnection();
  const reservation = knex(Tables.RESERVATIONS).select("*").where({ id }).returning("*");
  return reservation as unknown as IReturnReservation;
}

export const getReservations = async (): Promise<IReturnReservations> => {
  const knex = getDatabaseConnection();
  const reservations = knex(Tables.RESERVATIONS).select("*");
  return reservations as unknown as IReturnReservations;
}

export const createReservation = async (reservation: IReservation): Promise<IReturnReservation> => {
  const knex = getDatabaseConnection();
  const [createdReservation] = await knex(Tables.RESERVATIONS).insert(reservation).returning("*");
  return createdReservation as unknown as IReturnReservation;
}

export const updateReservationDate = async (id: string, reservation: Partial<IReservation>): Promise<IReturnReservation> => {
  const { start_date, end_date } = reservation;
  const knex = getDatabaseConnection();
  const [updatedReservation] = await knex(Tables.RESERVATIONS).where({ id }).update({
    start_date,
    end_date,
    updated_at: new Date().toISOString()
  }).returning("*");
  return updatedReservation as unknown as IReturnReservation;
}

export const deleteReservation = async (id: string): Promise<void> => {
  const knex = getDatabaseConnection();
  await knex(Tables.RESERVATIONS).where({ id }).del();
}

export const getReservationsByGuestId = async (user_id: string): Promise<IReturnReservations> => {
  const knex = getDatabaseConnection();
  const reservations = knex(Tables.RESERVATIONS).select("*").where({ user_id });
  return reservations as unknown as IReturnReservations;
}

export const getReservationsByPropertyId = async (property_id: string): Promise<IReturnReservations> => {
  const knex = getDatabaseConnection();
  const reservations = knex(Tables.RESERVATIONS).select("*").where({ property_id });
  return reservations as unknown as IReturnReservations;
}
