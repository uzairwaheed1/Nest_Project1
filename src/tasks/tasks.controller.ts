import { Body, Controller, Get, Post, Param, Delete, Patch, Put, Query } from '@nestjs/common';
import { TasksService,  } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';


@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }



    @Get()
    getTasks(@Query() filterTaskDto: FilterTaskDto): Task[] {
        if(Object.keys(filterTaskDto)){
            return this.tasksService.getTasks(filterTaskDto);

        }
        else{
            return this.tasksService.getAllTasks();
        }
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Put('/:id')
    updateTaskById(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto): Task {
        return this.tasksService.updateTaskById(id, updateTaskDto);
    }   

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Task[] {
        return this.tasksService.deleteTask(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }






}
