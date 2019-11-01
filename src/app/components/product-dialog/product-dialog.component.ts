import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SpazaService } from 'src/app/services/spaza.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  productList;
  spazauid;
  size;
  constructor(
    private afs: AngularFirestore,
    private dialogRef: MatDialogRef<ProductDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) data, 
    public dialog: MatDialog,
    private spazaServe: SpazaService
  ) {
    this.spazauid=data.key;
    console.log("id "+this.spazauid)
   }

  ngOnInit() {
    this.dialogRef.updateSize('30%');

    this.spazaServe.getProducts(this.spazauid).ref.get().then((query) => {
      this.size = query.size
      if (this.size == 0) {
        this.productList = 0
     
      } else {
        this.spazaServe.getProducts(this.spazauid).snapshotChanges().subscribe(data => {

          this.productList = data.map(e => {
            return {
              key: e.payload.doc.id,
              ...e.payload.doc.data()
            };
          });
          console.log(this.productList);
        })
      }
    })
  }

  onDelete(product){
    this.spazaServe.getProducts(this.spazauid).doc(product.key).delete().then(()=>{
      console.log("deleted")
    })
  }
}
