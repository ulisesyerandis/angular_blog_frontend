import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../model/blog';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: 
  [
    CommonModule, MatTableModule,
    MatButtonModule, MatPaginator
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit 
{
  blogList: Blog[] = [];
  blog?: Blog;
  blogDeleted?: Blog;
  blogCreated?: Blog;
  blogUpdated?: Blog;

  displayedColumns: string[] = ['position', 'id', 'title', 'author', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Blog>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public constructor(private blogService: BlogService)
  { }
  
  ngOnInit(): void 
  {
    this.getAllBlogs();
  }

  public getAllBlogs()
  {
    this.blogService.getAllBlogs().subscribe({
      next: (response: any) => {
        this.blogList = response;
        this.dataSource.data = this.blogList;
        
        console.log('bloglist = ' + this.blogList);
        console.log('datasource = ' + this.dataSource)
      },
      error: (error: any) => {

      },
    });
  }

  public getBlog(id: string)
  {
    this.blogService.getBlog(id).subscribe({
      next: (response: any) => {
        this.blog = response;
        console.log('blog title = ' + this.blog?.title);
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

  public createBlog(blog: Blog)  
  {
    this.blogService.createBlog(blog).subscribe({
      next: (response: any) => {
        this.blogCreated = response;
      },
    });
  }

  public updateBlog(id: string, blog: Blog)
  {
    this.blogService.updateBlog(id, blog).subscribe({
      next: (response: any) => {
        this.blogUpdated = response;
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

  public deleteBlog(id: string)
  {
    this.blogService.deleteBlog(id).subscribe({
      next: (response: any) => {
        this.blogDeleted = response;
        console.log('blog deleted = ' + this.blogDeleted?.title);
        location.reload();
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
}
