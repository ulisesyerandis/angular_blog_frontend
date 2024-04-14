import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Blog } from '../../model/blog';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: 
  [
    CommonModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule, MatButtonModule
  ],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})

export class BlogFormComponent 
{
  blogCreated!: Blog;
  formulario: FormGroup;

  constructor
  (
    private fb: FormBuilder, 
    private blogService: BlogService
  ) 
  {
    this.formulario = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required]
    });

   }

  onSubmit() 
  {
    if (this.formulario.valid) 
      {
      this.blogCreated = this.formulario.value;
      console.log('blog = ' + this.blogCreated.title + ' created');

      this.createBlog(this.blogCreated);
    } else
    {
      console.error('Formulario inválido');
    }
  }

  public createBlog(blog: Blog)  
  {
    this.blogService.createBlog(blog).subscribe({
      next: (response: any) => {
        this.blogCreated = response;
      },
    });
  }



}
