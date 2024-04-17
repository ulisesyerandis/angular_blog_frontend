import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: 
  [
    CommonModule, MatDialogModule 
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent 
{
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) 
  {}

  public onNoClick()
  {
    this.dialogRef.close(false);
  }

  public onYesClick()
  {
    this.dialogRef.close(true);
  }
}
