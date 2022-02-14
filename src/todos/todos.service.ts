import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {

    todos : Todo[] = [
        {
            id: 1,
            title: 'Todos App',
            describe: 'Todos App gonna be running',
            done: false,
        },
        {
            id: 2,
            title: 'bread',
            describe: 'bread gonna be buy',
            done: true,
        },
        {
            id: 3,
            title: 'rice',
            describe: 'rice gonna be buy',
            done: true,
        },
    ];

    findOne(id: string) {
        return this.todos.find(todo => todo.id === Number(id));
    }

    findAllTodos(): Todo[] {
        return this.todos;
    }

    createTodo( todo: Todo) {
        this.todos = [...this.todos, todo];
    }

    updateTodo(id: string, todo: Todo) {
        const todoUpdate = this.todos.find(t => t.id === +id);
        if (!todoUpdate) {
            return new NotFoundException('did not found this todo');
        }

        if (todo.hasOwnProperty('done')) {
            todoUpdate.done = todo.done;
        }
        if (todo.title) {
            todoUpdate.title = todo.title;
        }
        if (todo.describe) {
            todoUpdate.describe = todo.describe;
        }

        const updateTodos = this.todos.map(todo => todo.id !== +id ? todo : todoUpdate);
        this.todos = [...updateTodos];
        return {updateTodo : 1, todo : updateTodos };
    }
}
