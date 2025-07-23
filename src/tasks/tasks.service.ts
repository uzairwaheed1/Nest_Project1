import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repositary';

@Injectable()
export class TasksService {

    
    constructor(
        // @InjectRepository(Task)
        private readonly tasksRepository: TaskRepository) 
        {}

    // private tasks: Task[] = [];

    
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasks(filterTaskDto: FilterTaskDto): Task[] {
    //     const { search, status } = filterTaskDto;
    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if (search){
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    //     }
    //     return tasks;
    // }

    async getTaskById(id: string): Promise<Task> {
        // console.log('Service received id:', id);

        return this.tasksRepository.getTaskById(id);
    }
    // getTaskById(id: string): Task {
    //     const task = this.tasks.find(task => task.id === id);
    //     if (!task) {
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }
    //     return task;
    // }

    async deleteTask(id: string): Promise<void> {
        return this.tasksRepository.deleteTask(id)
    }

    
    
    // updateTaskById(id: string, updateTaskDto: CreateTaskDto): Task {
    //     const task = this.getTaskById(id);
    //     task.title = updateTaskDto.title;
    //     task.description = updateTaskDto.description;
    //     return task;
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

     async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksRepository.createTask(createTaskDto)
            // const { title, description } = createTaskDto;

            // const task: Task = this.tasksRepository.create({
            //     title,
            //     description,
            //     status: TaskStatus.OPEN
            // })

            // await this.tasksRepository.save(task);
            // return task;
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }
}
