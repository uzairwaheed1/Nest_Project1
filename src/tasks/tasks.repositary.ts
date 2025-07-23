import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
// import {}

// @Injectable()
// export class TaskRepository  {
//   constructor(
//     @InjectRepository(Task)
//     private readonly taskRepository: Repository<Task>,
//   ) {}
// }

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }
}