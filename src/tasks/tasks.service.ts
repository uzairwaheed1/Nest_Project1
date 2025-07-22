import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasks(filterTaskDto: FilterTaskDto): Task[] {
        const { search, status } = filterTaskDto;
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }
        if (search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
    }
    getTaskById(id: string): Task {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }

    deleteTask(id: string): Task[] {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
        return this.tasks;
    }

    
    
    updateTaskById(id: string, updateTaskDto: CreateTaskDto): Task {
        const task = this.getTaskById(id);
        task.title = updateTaskDto.title;
        task.description = updateTaskDto.description;
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }


    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task);
        return task;
    }
}
