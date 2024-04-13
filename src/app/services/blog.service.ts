import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Blog_Model } from '../model/blog_Model';

@Injectable({
  providedIn: 'root'
})
export class BlogService 
{
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

  public createBlog(blog: Blog_Model)
  {
    return this.http.post('http://localhost:8000/blog', blog);
  }

  public updateBlog(id: string, blog: Blog_Model)
  {
    return this.http.put('http://localhost:8000/blog/'  + id, blog);
  }

  public deleteBlog(id: string)
  {
    return this.http.delete('http://localhost:8000/blog/' + id);
  }
}