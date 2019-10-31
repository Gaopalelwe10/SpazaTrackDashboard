import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { UserupdateDialogComponent } from '../userupdate-dialog/userupdate-dialog.component';
// import { UsertableDataSource } from './usertable-datasource';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  array;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Name', 'Email', 'Address', 'Gender', 'Registered','actions'];
  constructor(private userService: UserService, private dialog: MatDialog) { }
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
    this.userService.getUsers().subscribe((data:any) => {
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
  onEdit(user) {
    console.log(user);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        displayName: user.displayName,
        uid: user.uid,
        Email: user.Email,
        Address: user.Address,
        gender: user.gender,
        Registered: user.Registered
    
    };

    this.dialog.open(UserupdateDialogComponent, dialogConfig);
  }

  onDelete(row){
    this.userService.Delete(row.uid).then((results:any)=>{
      alert("deleted")
    }).catch(err=>{
      alert(err.message)
    })
  }
}
