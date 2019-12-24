import { AgendaTaskCommand, task } from 'inversify-agenda';
import { Job } from 'agenda';
import { UserModel } from '../models/User';

@task('checkUsers', 'every 10 minutes')
export class AddUser implements AgendaTaskCommand {
  // eslint-disable-next-line class-methods-use-this
  async execute(job: Job) {
    const usersCount = await UserModel.countDocuments().exec();
    // eslint-disable-next-line no-console
    console.log(`[Job "${job.attrs.name} called] Users in DB: ${usersCount}`);
  }
}
