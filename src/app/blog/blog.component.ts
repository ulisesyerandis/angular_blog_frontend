import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog_Model } from '../model/blog_Model';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: 
  [
    CommonModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent 
{
  blogList: Blog_Model[] = [];
  blog?: Blog_Model;
  blogDeleted?: Blog_Model;
  blogCreated?: Blog_Model;
  blogUpdated?: Blog_Model;

  public constructor(private blogService: BlogService)
  {}

  public getAllBlogs()
  {
    this.blogService.getAllBlogs().subscribe({
      next: (response: any) => {
        this.blogList = response;
        console.log(this.blogList);
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

  public createBlog(blog: Blog_Model)  
  {
    this.blogService.createBlog(blog).subscribe({
      next: (response: any) => {
        this.blogCreated = response;
      },
    });
  }

  public updateBlog(id: string, blog: Blog_Model)
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
