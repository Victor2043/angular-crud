import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})


export class SinglePageComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<any>();
  form:FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder :FormBuilder) { }

  ngOnInit()  {
    this.buldForm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  buldForm(){
    this.form = this.formBuilder.group({
      name : [''],
      position : [''],
      weight : [''],
      symbol : [''],
    })
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  
];




