import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService 
{
  
  public constructor(private http: HttpClient)
  { }

  public getAllBlogs(criteria?: string)
  {
    let params = new HttpParams;
    if(criteria)
      {
        params = params.set('criteria', criteria);
      }
    return this.http.get('http://localhost:8000/blog', {params});
  }

  public getBlog(id: string)
  {
    return this.http.get('http://localhost:8000/blog/' + id);
  }

  public createBlog(blog: Blog)
  {
    return this.http.post('http://localhost:8000/blog', blog);
  }

  public updateBlog(id: string, blog: Blog)
  {
    return this.http.put('http://localhost:8000/blog/'  + id, blog);
  }

  public deleteBlog(id: string)
  {
    return this.http.delete('http://localhost:8000/blog/' + id);
  }
}