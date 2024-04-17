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
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
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
  private blogCreatedSubject = new BehaviorSubject<Blog | null>(null);

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
      console.log('deliver action = ' + this.formAction + '-' + params['action']);
    });
  
    if(this.formAction === 'Create')
      {console.log('deliver action = ' + this.formAction );
        this.title = this.formAction;
        this.buttonTitle = 'Create Blog';
      }
    else if (this.formAction == 'Update')
        {
          this.title = this.formAction;
          this.buttonTitle = 'Update Blog';
          
          if (this.blogJson) {
            this.oldBlog = JSON.parse(this.blogJson);
            console.log('deliver blog = ' + this.oldBlog);
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
        console.log('form valid ')
      if(this.formAction === 'Create')
        {
          this.blogCreated = this.formulario.value;
          this.createBlog(this.blogCreated);
          console.log('4- created done')
        }
      else if(this.formAction === 'Update')
        {
          this.newBlog = this.formulario.value;
          this.updateBlog(this.oldBlog, this.newBlog);
          console.log('updated done')
        }
        this.back();
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
        console.log('1- blog created = ' + this.blogCreated);
        console.log('2- formulario created = ' + this.formulario.value);
        console.log('3- blog = ' + this.blogCreated.title + ' created');

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
    Swal.fire({
      title: "Are you sure?",
      text: "You wan to update the blog "
      + oldBlog.title + " from " + oldBlog.author 
      + " -> " + newBlog.title + " from " + newBlog.author,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) 
        {
          this.blogService.updateBlog(oldBlog.id, newBlog).subscribe({
            next: (response: any) => {
              this.blogUpdated = response;
              console.log('1- blog updated = ' + this.blogUpdated.title);
                console.log('2- formulario updated = ' + this.formulario.value)
                console.log('3- blog = ' + this.blogUpdated.title + ' updated');
            },
            error: (error: any) => {
              if (error instanceof HttpErrorResponse)
                {
                console.log('Error status: ' + error.status);
                console.log('Error body: ' + JSON.stringify(error.error));
              } else {
                console.log('Error: ' + error);
              }
            },
          });

        Swal.fire({
          title: "Updated!",
          text: "Your blog has been updated.",
          icon: "success"
        });
      }
    });
  } 

  back() 
  {
    this.router.navigate(['/blog']);
  }

  
}
