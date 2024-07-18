export interface IReturnReservation {
  id: string;
  user_id: string;
  property_id: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface IReturnReservations {
  reservations: IReturnReservation[];
}

export interface IReservation {
  user_id: string;
  property_id: string;
  start_date: string;
  end_date: string;
}
