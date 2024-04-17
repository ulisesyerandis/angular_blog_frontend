import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Blog } from '../../model/blog';
import { BlogService } from '../../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

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

  blogJson?: string;
  formAction: string = '';

  constructor
  (
    private fb: FormBuilder, 
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
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
    this.route.queryParams.subscribe(params => {
      this.formAction = params['action'];
      this.blogJson = params['blog'];
    });
  
    if(this.formAction === 'Create')
      {
        this.title = this.formAction;
        this.buttonTitle = 'Create Blog';
      }
    else if (this.formAction == 'Update')
        {
          this.title = this.formAction;
          this.buttonTitle = 'Update Blog';
          
          if (this.blogJson) {
            this.oldBlog = JSON.parse(this.blogJson);
          }

          this.formulario = this.fb.group({
            title: [this.oldBlog.title, Validators.required],
            content: [this.oldBlog.content, Validators.required],
            author: [this.oldBlog.author, Validators.required]
          });
        }
  }

  onSubmit() 
  {
    if (this.formulario.valid) 
      {
      if(this.formAction === 'Create')
        {
          this.blogCreated = this.formulario.value;
          this.createBlog(this.blogCreated);
        }
      else if(this.formAction === 'Update')
        {
          this.newBlog = this.formulario.value;
          this.updateBlog(this.oldBlog, this.newBlog);
        }
        this.back();
    } else
    { }
  }

  public createBlog(blog: Blog)  
  {
    this.blogService.createBlog(blog).subscribe({
      next: (response: any) => {
        this.blogCreated = response;
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your blog has been saved",
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (error: any) => {
      },
    });
  }

  public updateBlog(oldBlog: Blog, newBlog: Blog)
  {
          this.blogService.updateBlog(oldBlog.id, newBlog).subscribe({
            next: (response: any) => {
              this.blogUpdated = response;
              this.blogService.getAllBlogs();
              
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your blog has been updated",
                showConfirmButton: false,
                timer: 2000
              });
            },
            error: (error: any) => {
              if (error instanceof HttpErrorResponse)
                {
                  Swal.fire({
                    title: "Error updating blog",
                    text:  "Error " + JSON.stringify(error.error) + "Error status:"  + error.status,
                    icon: "error",
                  });
              } else {
              }
            },
          });
  } 

  back() 
  {
    this.router.navigate(['/blog']);
  }

  
}
