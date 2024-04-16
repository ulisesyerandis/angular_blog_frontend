import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Blog } from '../model/blog';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService 
{
  // public blogCreatedSubject = new BehaviorSubject<Blog | null>(null);

  public constructor(private http: HttpClient)
  { }

  public getAllBlogs()
  {
    return this.http.get('http://localhost:8000/blog');
  }

  public getBlog(id: string)
  {
    return this.http.get('http://localhost:8000/blog/' + id);
  }

  public createBlog(blog: Blog)
  {
    return this.http.post('http://localhost:8000/blog', blog);
  }

  // get blogCreated$() {
  //   return this.blogCreatedSubject.asObservable();
  // }

  // createBlog(blog: Blog) {
  //   return this.http.post('http://localhost:8000/blog', blog).subscribe({
  //     next: (response: any) => {
  //       this.blogCreatedSubject.next(response);
  //     },
  //     error: (error: any) => {
  //       console.error('Error creating blog:', error);
  //     }
  //   });
  // }
    

  public updateBlog(id: string, blog: Blog)
  {
    return this.http.put('http://localhost:8000/blog/'  + id, blog);
  }

  public deleteBlog(id: string)
  {
    return this.http.delete('http://localhost:8000/blog/' + id);
  }
}