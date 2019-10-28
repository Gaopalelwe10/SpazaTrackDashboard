import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  spazaRef: AngularFirestoreDocument<any>;
  spaza$: Observable<any>;

  commentsRef: AngularFirestoreCollection<any>;
  comments$: Observable<any>;
  ItemsList;
  spazauid
  users:any;
  constructor( private afs: AngularFirestore, private dialogRef: MatDialogRef<CommentDialogComponent>, @Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) {
    this.spazauid=data.key;
    console.log("id "+this.spazauid)
    this.spazaRef = this.afs.doc(`spazashop/${this.spazauid}`)
    // this.postRef = this.afs.doc('posts/testPost')
    this.users = this.afs.collection('users').valueChanges();
    this.commentsRef = this.spazaRef.collection('comments', ref => ref.orderBy('createdAt', 'desc'))
    this.commentsRef.snapshotChanges().subscribe(data =>{

      this.ItemsList=data.map(e =>{
        return{
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
      console.log(this.ItemsList);
    })

   }

  ngOnInit() {
    this.dialogRef.updateSize('50%');
  }

  onDelete(comment){
    this.spazaRef.collection('comments').doc(comment.key).delete().then(()=>{
      console.log("deleted")
    })
  }
}
