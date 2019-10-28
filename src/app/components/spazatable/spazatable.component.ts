import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { SpazaService } from 'src/app/services/spaza.service';
import { SpazaDialogComponent } from '../spaza-dialog/spaza-dialog.component';
// import { SpazatableDataSource } from './spazatable-datasource';

@Component({
  selector: 'app-spazatable',
  templateUrl: './spazatable.component.html',
  styleUrls: ['./spazatable.component.css']
})
export class SpazatableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  array;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Name', 'Email', 'Address', 'Registered', 'commentCount', 'Discription'];
  constructor(private spazaService: SpazaService, private dialog: MatDialog) { }
  ngOnInit() {
    this.getAllusers()

    // this.dataSource = new MatTableDataSource(this.paginator, this.sort);
  }
  // ngAfterViewInit() {
  //   this.dataSource = new UserTableDataSource(this.paginator, this.sort);
  // }

  getAllusers(/*userCoords*/) {
    // this.users = this.afs.collection('users').valueChanges().subscribe(data => {
    //   console.log(data)
    // })
    this.spazaService.getSpazas().subscribe((data: any) => {
      // this.dataSource.data=data

      this.array = data.map(e => {
        return {
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });

      console.log(this.array)
      this.dataSource = new MatTableDataSource(this.array)
      // this.dataSource.data = this.array;
      // this.dataSource.data=array
      // console.log(this.dataSource.length)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    // this.afs.collection('users').valueChanges().subscribe((data:any)=>{
    //   data.forEach(element=>{
    //     let user ={
    //       displayName: element,
    //       uid: element.uid,
    //       Email: element.Email,
    //       Address: element.Address,
    //       photoURL: element.photoURL,
    //       Registered: element.Registered,
    //     };
    //     this.dataSource.push(user);

    //   })
    // })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  pop(spaza) {
    console.log(spaza);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      Address: spaza.Address,
      Close: spaza.Close,
      Discription: spaza. Discription,
      Hours: spaza.Hours,
      Number: spaza.Number,
      commentCount: spaza.commentCount,
      key: spaza.key,
      photoURL: spaza.photoURL,
      spazaName: spaza.spazaName,
    };

    this.dialog.open(SpazaDialogComponent, dialogConfig);
  }
}
