import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { UserupdateDialogComponent } from '../userupdate-dialog/userupdate-dialog.component';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css'],
  providers: [DatePipe]
})
export class UsertableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  displayedColumns = ['Name', 'Email', 'Address', 'Gender', 'Registered', 'actions'];

  array;
  excel = [];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private excelService: ExcelServiceService,
    private datepipe: DatePipe
  ) { }
  ngOnInit() {
    this.getAllusers()
  }


  getAllusers() {

    this.userService.getUsers().subscribe((data: any) => {

      this.array = data.map(e => {
        return {
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });

      console.log(this.array)
      this.dataSource = new MatTableDataSource(this.array)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    })

    this.userService.getUsersV().subscribe((data: any) => {
      data.forEach(element => {
        let user = {
          Name: element.displayName,
          Email: element.Email,
          Address: element.Address,
          photoURL: element.photoURL,
          Registered: element.Registered,
          Gender: element.gender,
          Registerd_On: this.datepipe.transform(element.Timestamp, 'MMM d, y, h:mm a')
        };
        this.excel.push(user);
        console.log("LL" + user)
      });
    })
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

  onDelete(row) {
    this.userService.Delete(row.uid).then((results: any) => {
      alert("deleted")
    }).catch(err => {
      alert(err.message)
    })
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, 'UserTable');
  }
}
