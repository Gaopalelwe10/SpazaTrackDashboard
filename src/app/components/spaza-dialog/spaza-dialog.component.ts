import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-spaza-dialog',
  templateUrl: './spaza-dialog.component.html',
  styleUrls: ['./spaza-dialog.component.scss']
})
export class SpazaDialogComponent implements OnInit {
  spaza: any;
  constructor(private dialogRef: MatDialogRef<SpazaDialogComponent>, @Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) {
    console.log(data);
    this.spaza = data;
  }

  ngOnInit() {
    this.dialogRef.updateSize('50%');
  }
  viewComments(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight="84vh";
    // dialogConfig.maxWidth="50%";

  //   dialogConfig.data = {
  //     ownerKey : spaza.ownerKey,
  //     spazaKey : spaza.spazaKey,
  //     spazaName : spaza.spazaName,
  //     cityName : spaza.cityName,
  //     streetName : spaza.streetName
  //   };
    dialogConfig.data = this.spaza;
    this.close();

    this.dialog.open(CommentDialogComponent , dialogConfig);

  }

  close() {
    this.dialogRef.close();
  }
}
