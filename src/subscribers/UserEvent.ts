import { EventSubscriber, On } from 'event-dispatch';
import { User } from '../models/User';

export const EVENT_ID = {
  USER_CREATE: Symbol.for('onUserCreate').toString(),
  USER_UPDATE: Symbol.for('onUserUpdate').toString(),
};

@EventSubscriber()
export class UserEventSubscriber {
  @On(EVENT_ID.USER_CREATE)
  // eslint-disable-next-line class-methods-use-this
  onUserCreate(createdUser: User) {
    // do something here: inform an external system etc.
    console.debug(createdUser);
  }

  @On(EVENT_ID.USER_UPDATE)
  // eslint-disable-next-line class-methods-use-this
  updateUserStatus(updatedUser: User) {
    // do something here: inform an external system etc.
    console.debug(updatedUser);
  }
}
