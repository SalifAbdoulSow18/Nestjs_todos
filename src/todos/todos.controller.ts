import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(public readonly todosServices: TodosService){}


    @Get(':id')
    findOne(@Param('id') id: string){
        return this.todosServices.findOne(id);
    }

    @Get()
    findAll(): Todo[] {
        return this.todosServices.findAllTodos();
    }

    @Post()
    createTodo(@Body() newTodo) {
        this.todosServices.createTodo(newTodo);
    }
    @Patch(':id')
    updateTodo(@Param('id') id, @Body() todo) {
        return this.todosServices.updateTodo(id, todo);
    }
}


