import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../model/blog';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { BlogModalComponent } from '../blog-modal/blog-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: 
  [
    CommonModule, MatTableModule, MatButtonModule, MatPaginator,
    BlogFormComponent, FormsModule, MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit 
{
  blogToUpdate!: Blog;

  blogList: Blog[] = [];
  blog?: Blog;
  blogDeleted?: Blog;
  blogCreated?: Blog;

  searchCriteria: number = 0;
  show: boolean = false;

  displayedColumns: string[] = ['position', 'id', 'title', 'author', 'options'];
  dataSource = new MatTableDataSource<Blog>();

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  ngAfterViewInit() 
  {
    this.dataSource.paginator = this.paginator;
  }

  public constructor
  (
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  )
  { }
  
  ngOnInit(): void 
  { 
    this.route.queryParams.subscribe(params =>{
      this.getAllBlogs();
    })
  }

  public getAllBlogs(criteria?: number)
  {
    this.blogService.getAllBlogs(criteria).subscribe({
      next: (response: any) => {
        this.blogList = response;
        this.dataSource.data = this.blogList;
        this.setupPaginator();
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) 
          {
            Swal.fire({
              title: "Blog not found",
            });
          } else {
        }
      },
    });
  }

  public setupPaginator() 
  {
    this.dataSource.paginator = this.paginator;
  }                                   

  public deleteBlog(id: string)
  {
    Swal.fire({
      title: "Are you sure?",
      text: "You wan to delete this blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) 
        {
          this.blogService.deleteBlog(id).subscribe({
          next: (response: any) => {
          this.blogDeleted = response;

          Swal.fire({
            title: "Deleted!",
            text: "The blog " + this.blogDeleted?.title + " written by " 
            + this.blogDeleted?.author + " has been deleted.",
            icon: "success"
          });
          this.getAllBlogs();
          },
          error: (error: any) => {
          if (error instanceof HttpErrorResponse) 
            {
              Swal.fire({
                title: "Error deleting blog ",
              });
            } else {
            }
          },
        });  
      }
    });
  }

  public createButton()
  {
    this.navigateToForm('Create');
  }

  public updateBlog(id: string, blog: Blog)
  {
    this.blogToUpdate = blog;
    this.blogToUpdate.id = id;
    this.navigateToForm('Update', this.blogToUpdate);
  }

  public navigateToForm(action: string, blog?: Blog) 
  {
    if(action === 'Create')
      {
        this.router.navigate(['/blog-form'], {queryParams: {action: 'Create'}});
      } else if(action === 'Update')
    {
      const blogJson = JSON.stringify(blog);
      this.router.navigate(['/blog-form'], {queryParams: {action: 'Update', blog: blogJson}});
    }
  }
  
  public search() 
  {
    if (this.searchCriteria) 
      {
      this.getAllBlogs(this.searchCriteria);
      this.show = true;
    } else {
      this.getAllBlogs(); 
    }
  }
  
  public openDialog(blog: Blog) 
  {
    this.dialog.open(BlogModalComponent, {
      width: '400px',
      data: blog
    });
  }

  public fillTable()
  {
    this.getAllBlogs();
    this.show = false
  }
}
