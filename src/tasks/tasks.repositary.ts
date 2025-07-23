import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import {CreateTaskDto} from './dto/create-task.dto'
import { FilterTaskDto } from './dto/filter-task.dto';

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

async getTask(filterTaskDto: FilterTaskDto): Promise<Task[]>{

  const query =  this.repo.createQueryBuilder('task');

  const {status, search} = filterTaskDto;

  if (status)
  {
    query.where('task.status = :status', {status})

  }
  if (search)
  {
    query.where('Lower(task.title) LIKE Lower(:search) OR Lower(task.description) LIKE Lower(:search)', {search: `%${search}%`})

  }

  const task = query.getMany();

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

async updateTaskById(id: string, status: TaskStatus): Promise<Task>{
  const result = await this.repo.update(id, {status})
  if (result.affected === 0) throw new NotFoundException(`Task with ID "${id}" not found`);
  const updateData = await this.repo.findOne({where: { id }})
  if (!updateData) {
    throw new NotFoundException(`Task with ID "${id}" not found`);
  }
  
  return updateData;
}

async deleteTask(id: string): Promise<void> {
  console.log("This entity has been deleted: ", id )
  await this.repo.delete(id);
}
}