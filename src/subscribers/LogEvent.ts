import { EventSubscriber, On } from 'event-dispatch';
import { createLogger, format, LogEntry, Logger, transports } from 'winston';
import { LOG_LEVEL, LOGGING_ENABLED } from '../config/config';

export const LOG_EVENT_ID = {
  LOG: Symbol.for('onLog').toString(),
};

export interface LogEventEntry extends LogEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: { [key: string]: any };
}

@EventSubscriber()
export class LogEventSubscriber {
  protected logger: Logger;

  constructor() {
    this.logger = createLogger({
      silent: !LOGGING_ENABLED,
      level: LOG_LEVEL,
      format: format.json(),
      transports: [
        new transports.Console({
          format: format.prettyPrint({ colorize: true }),
        }),
      ],
    });
  }

  @On(LOG_EVENT_ID.LOG)
  onLog({ level, message, data }: LogEventEntry) {
    this.logger.log(level, message, data);
  }
}
