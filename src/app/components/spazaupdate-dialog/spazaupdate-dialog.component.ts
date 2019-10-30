import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-spazaupdate-dialog',
  templateUrl: './spazaupdate-dialog.component.html',
  styleUrls: ['./spazaupdate-dialog.component.scss']
})
export class SpazaupdateDialogComponent implements OnInit {
  spaza
  updateForm: any;
  constructor(
    private afs: AngularFirestore, 
    private dialogRef: MatDialogRef<SpazaupdateDialogComponent>, @Inject(MAT_DIALOG_DATA) data, 
    public dialog: MatDialog,) {
    this.spaza = data;
    this.updateForm = new FormGroup({
      spazaName: new FormControl(data. spazaName, Validators.required),
      Discription: new FormControl(data.Discription, Validators.required),
      Number: new FormControl(data.Number, Validators.required),
      Address:new FormControl(data.Address, Validators.required),
    });

    
  }

  ngOnInit() {
    this.dialogRef.updateSize('50%');
  }
 Update(){
  this.afs.collection('spazashop').doc(this.spaza.key).update({
    spazaName: this.updateForm.value.spazaName,
    Discription: this.updateForm.value.Discription,
    Address: this.updateForm.value.Address,
    Number: this.updateForm.value.Number,
  

  }).then(() => {
    console.log("updated")
    // this.route.navigateByUrl("spazaboard")
 

  }).catch(err => {
    alert(err.message)
  })
 }
  Cancel(){
    this.dialogRef.close();
  }
}
