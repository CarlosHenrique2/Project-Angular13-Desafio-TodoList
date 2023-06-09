import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { prioridades, tasks } from '../../interfaces/interfaces';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home-todo',
  templateUrl: './home-todo.component.html',
  styleUrls: ['./home-todo.component.scss']
})
export class HomeTodoComponent {

  formtask!: FormGroup;
  tasks: tasks[] = [];
  prioridades: prioridades[] = [
    {value: 'Baixa'},
    {value: 'Media'},
    {value: 'Alta'},
  ];
  
  constructor(
    private taskservice: TaskService,
    private fb: FormBuilder
    ) { 
      this.formtask = this.fb.group({
        titulo: ['', Validators.required],
        descricao: ['', Validators.required],
        data: ['', Validators.required],
        prioridade: ['', Validators.required]
      })
    }

  public createTask(): void {
    const task = this.formtask.getRawValue()
    this.taskservice.creatTask(task)
    this.taskservice.creatTask(task).subscribe({
      next: (res) => {
        this.tasks = []
        this.formtask.reset()
      },
      error: console.log
    })
  }

}
