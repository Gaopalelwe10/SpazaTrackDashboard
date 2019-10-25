import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SpazatableDataSource } from './spazatable-datasource';

@Component({
  selector: 'app-spazatable',
  templateUrl: './spazatable.component.html',
  styleUrls: ['./spazatable.component.css']
})
export class SpazatableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SpazatableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit() {
    this.dataSource = new SpazatableDataSource(this.paginator, this.sort);
  }
}
