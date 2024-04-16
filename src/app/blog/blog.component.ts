import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
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

  displayedColumns: string[] = ['position', 'id', 'title', 'author', 'options'];
  dataSource = new MatTableDataSource<Blog>();

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  ngAfterViewInit() {
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
        console.log('bloglist = ' + this.blogList);
        console.log('datasource = ' + this.dataSource);
        this.setupPaginator();
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
  }

  public setupPaginator() 
  {
    this.dataSource.paginator = this.paginator;
    console.log('paginator = ' + this.dataSource.paginator);
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

  public deleteBlog(id: string)
  {
    this.blogService.deleteBlog(id).subscribe({
      next: (response: any) => {
        this.blogDeleted = response;
        console.log('blog deleted = ' + this.blogDeleted?.title);
        this.getAllBlogs();
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
    console.log('sended action: ' + action);
    if(action === 'Create')
      {
        this.router.navigate(['/blog-form'], {queryParams: {action: 'Create'}});
      } else if(action === 'Update')
    {
      console.log('sending blog: ' + blog?.title);
      console.log('sended action: ' + action);
      const blogJson = JSON.stringify(blog);
      this.router.navigate(['/blog-form'], {queryParams: {action: 'Update', blog: blogJson}});
    }
  }
  
  public search() 
  {
    if (this.searchCriteria) 
      {
      this.getAllBlogs(this.searchCriteria);
    } else {
      this.getAllBlogs(); 
    }
  }
  
  public openDialog(blog: Blog) 
  {
    console.log('open dialog')
    this.dialog.open(BlogModalComponent, {
      width: '400px',
      data: blog
    });
  }
}
