export const SERVICES = {
  USER_SERVICE: 'USER_SERVICE',
  ORDER_SERVICE: 'ORDER_SERVICE',
  NOTIFICATION_SERVICE: 'NOTIFICATION_SERVICE',
} as const;

export const USER_SERVICE_PATTERNS = {
  CREATE_USER: { cmd: 'create_user' },
  GET_USER: { cmd: 'get_user' },
  UPDATE_USER: { cmd: 'update_user' },
  DELETE_USER: { cmd: 'delete_user' },
  GET_ALL_USERS: { cmd: 'get_all_users' },
} as const;

export const ORDER_SERVICE_PATTERNS = {
  CREATE_ORDER: { cmd: 'create_order' },
  GET_ORDER: { cmd: 'get_order' },
  GET_USER_ORDERS: { cmd: 'get_user_orders' },
  UPDATE_ORDER_STATUS: { cmd: 'update_order_status' },
} as const;

export const NOTIFICATION_SERVICE_PATTERNS = {
  SEND_EMAIL: { cmd: 'send_email' },
  SEND_SMS: { cmd: 'send_sms' },
} as const;
