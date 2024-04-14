import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Blog } from '../../model/blog';
import { BlogService } from '../../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';


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

export class BlogFormComponent implements OnInit
{
  
  formulario: FormGroup;
  blogCreated!: Blog;
  blogUpdated!: Blog;
  oldBlog!: Blog;
  newBlog!: Blog;

  title: string = 'Create Blog';
  buttonTitle: string = '';

  @Input()actionForm: string = '';
  @Input()blogToUpdate!: Blog;
  @Output()editable = new EventEmitter<boolean>();

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

   ngOnInit(): void
  {
    if(this.actionForm === 'Create')
      {
        this.title = this.actionForm;
        this.buttonTitle = 'Create Blog';
      }
      else if (this.actionForm == 'Update')
        {
          this.title = this.actionForm;
          this.buttonTitle = 'Update Blog';
          this.formulario.value.title = this.blogToUpdate.title;
          this.formulario.value.content = this.blogToUpdate.content;
          this.formulario.value.author = this.blogToUpdate.author;
          this.oldBlog = this.blogToUpdate;
        }
  }

  onSubmit() 
  {
    if (this.formulario.valid) 
      {
      if(this.actionForm === 'Create')
        {
          this.blogCreated = this.formulario.value;
          console.log('blog = ' + this.blogCreated.title + ' created');
          this.createBlog(this.blogCreated);
        }
        else if(this.actionForm === 'Update')
          {
            this.newBlog = this.formulario.value;
            this.updateBlog(this.oldBlog, this.newBlog);
          }
        this.back();
        location.reload();
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

  public updateBlog(oldBlog: Blog, newBlog: Blog)
  {
    this.blogService.updateBlog(oldBlog.id, newBlog).subscribe({
      next: (response: any) => {
        this.blogUpdated = response;
        console.log('updated = ' + this.blogUpdated.title);
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Error status: ' + error.status);
          console.log('Error body: ' + JSON.stringify(error.error));
        } else {
          console.log('Error: ' + error);
        }
      },
    });
  } 

  back() 
  {
    this.editable.emit(false);
    location.reload();
  }

}
