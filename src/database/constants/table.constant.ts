export enum Tables {
  USERS = "users",
  PROPERTIES = "properties",
  RESERVATIONS = "reservations",
  MESSAGES = "messages",
  CONVERSATIONS = "conversations",
}

export enum Fields {
  ID = "id",
  NAME = "name",
  PHONE_NUMBER = "phone_number",
  SENDER = "sender",
  SENDER_ID = "sender_id",
  RECEIVER = "receiver",
  RECEIVER_ID = "receiver_id",
  BODY = "body",
  PROPERTY_ID = "property_id",
  START_DATE = "start_date",
  END_DATE = "end_date",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  CONVERSATION_ID = "conversation_id",
  ROLE = "role",
  RESERVATION_STATE = "reservation_state",
}

export enum ForeignKeys {
  USER_ID = "user_id",
  PROPERTY_ID = "property_id",
  SENDER_ID = "sender_id",
  RECEIVER_ID = "receiver_id",
}

export enum ROLES {
  PROPERTY_OWNER = "property_owner",
  GUEST = "guest",
}
