import { Body, Controller, Get, Post, Param, Delete, Patch, Put, Query } from '@nestjs/common';
import { TasksService,  } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusDto } from './dto/update-taskStatus.dto';
import { Task } from './task.entity';


@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }



    // @Get()
    // getTasks(@Query() filterTaskDto: FilterTaskDto): Task[] {
    //     if(Object.keys(filterTaskDto).length){
    //         return this.tasksService.getTasks(filterTaskDto);

    //     }
    //     else{
    //         return this.tasksService.getAllTasks();
    //     }
        
    // }

    @Get()
    getTasks(@Query() filterTaskDto: FilterTaskDto): Promise<Task[]>{
        return this.tasksService.getTasks(filterTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        // console.log('Controller received id:', id);
        return this.tasksService.getTaskById(id);
    }

    // @Put('/:id')
    // updateTaskById(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.updateTaskById(id, updateTaskDto);
    // }   

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
    }




}
