import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Blog } from '../model/blog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blog-modal',
  standalone: true,
  imports: 
  [
    MatDialogModule, MatButtonModule
  ],
  templateUrl: './blog-modal.component.html',
  styleUrl: './blog-modal.component.css'
})
export class BlogModalComponent 
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: Blog) 
  { }

}
