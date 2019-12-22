const SERVICE_ID = {
  SERVER: Symbol.for('Server'),
  APP: Symbol.for('App'),
  ROUTES: Symbol.for('Routes'),
  USER_MODEL: Symbol.for('UserModel'),
  USERS_SERVICE: Symbol.for('UsersService'),
  USERS_HANDLER: Symbol.for('UsersHandler'),
  EVENT_DISPATCHER: Symbol.for('EventDispatcher'),
};

export default SERVICE_ID;
