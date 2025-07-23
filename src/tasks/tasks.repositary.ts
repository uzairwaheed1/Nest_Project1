import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import {CreateTaskDto} from './dto/create-task.dto'

// @Injectable()
// export class TaskRepository  {
//   constructor(
//     @InjectRepository(Task)
//     private readonly taskRepository: Repository<Task>,
//   ) {}
// }

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task) 
    private readonly repo: Repository<Task>
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
    const { title, description } = createTaskDto;

    const task: Task = this.repo.create({
        title,
        description,
        status: TaskStatus.OPEN
    })

    await this.repo.save(task);
    return task;
}

async getTaskById(id: string): Promise<Task> {
  // console.log('Looking for task with id:', id);
  const found = await this.repo.findOne({ where: { id } });
  if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
  }
  return found;
}

async deleteTask(id: string): Promise<void> {
  console.log("This entity has been deleted: ", id )
  await this.repo.delete(id);
}
}