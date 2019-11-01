import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-userupdate-dialog',
  templateUrl: './userupdate-dialog.component.html',
  styleUrls: ['./userupdate-dialog.component.scss']
})
export class UserupdateDialogComponent implements OnInit {
  updateForm
  user
  constructor(private afs: AngularFirestore,
    private dialogRef: MatDialogRef<UserupdateDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
    public dialog: MatDialog, ) {
      this.user=data
    this.updateForm = new FormGroup({
      displayName: new FormControl(data.displayName, Validators.required),
      gender: new FormControl(data.gender, Validators.required),
      Registered: new FormControl(data.Registered, Validators.required),
      Address: new FormControl(data.Address, Validators.required),
    });

  }

  ngOnInit() {
    this.dialogRef.updateSize('50%');
  }

  Update(){

    this.afs.collection('users').doc(this.user.uid).update({
      displayName: this.updateForm.value.displayName,
      gender: this.updateForm.value.gender,
      Address: this.updateForm.value.Address,
      Registered: this.updateForm.value.Registered,
    }).then(() => {
      this. Cancel()
      console.log("updated")
      // this.route.navigateByUrl("spazaboard")
   
      alert("updated")
    }).catch(err => {
      alert(err.message)
    })
  }
  Cancel() {
    this.dialogRef.close();
  }
  gender = [
    {name: 'Male'},
    {name: 'Female'},
    {name: 'Other'},]
}
