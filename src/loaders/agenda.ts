import { mongoose } from '@typegoose/typegoose';
import Agenda from 'agenda';
import { InversifyAgenda } from 'inversify-agenda';
import container from '../config/dic';

const agendaLoader = () => {
  const agenda = new Agenda({ mongo: mongoose.connection.db });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const builtAgenda = new InversifyAgenda(container, { agenda: agenda as any }).build();

  return builtAgenda.start();
};

export default agendaLoader;
