import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { SpazaService } from 'src/app/services/spaza.service';
import { SpazaDialogComponent } from '../spaza-dialog/spaza-dialog.component';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-spazatable',
  templateUrl: './spazatable.component.html',
  styleUrls: ['./spazatable.component.css'],
  providers: [DatePipe]
})
export class SpazatableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  displayedColumns = ['Name', 'Email', 'Address', 'Registered', 'commentCount', 'Discription'];

  array;
  excel = [];

  constructor(
    private spazaService: SpazaService,
    private dialog: MatDialog,
    private excelService: ExcelServiceService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.getAllusers()
  }


  getAllusers() {
    this.spazaService.getSpazas().subscribe((data: any) => {

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


    this.spazaService.getSpazasMap().subscribe((data: any) => {

      data.forEach(element => {
        let user = {
          spazaName: element.spazaName,
          Address: element.Address,
          Discription: element.Discription,
          Open: this.datepipe.transform(element.Hours, 'hh:mm a'),
          Close: this.datepipe.transform(element.Close, 'hh:mm a'),
          Number: element.Number,
          commentCount: element.commentCount,
          photoURL: element.photoURL,
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
  pop(spaza) {
    console.log(spaza);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      Address: spaza.Address,
      Close: spaza.Close,
      Discription: spaza.Discription,
      Hours: spaza.Hours,
      Number: spaza.Number,
      commentCount: spaza.commentCount,
      key: spaza.key,
      photoURL: spaza.photoURL,
      spazaName: spaza.spazaName,
      uid: spaza.uid
    };

    this.dialog.open(SpazaDialogComponent, dialogConfig);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, 'SpazaTable');
  }
}
