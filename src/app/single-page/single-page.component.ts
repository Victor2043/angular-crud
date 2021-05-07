import { JsonpClientBackend } from '@angular/common/http';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SinglePageService } from '../service/single-page.service';


@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})


export class SinglePageComponent implements AfterViewInit {

  displayedColumns: string[] = ['modelo', 'marca', 'cor', 'placa'];
  dataSource = new MatTableDataSource<any>();
  form:FormGroup;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  cars;
  buttonsControl : boolean = true;

  constructor(private formBuilder :FormBuilder,
    private service: SinglePageService) { }

  ngOnInit()  {
    this.buldForm();
    this.getCars()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buldForm(){
    this.form = this.formBuilder.group({
      modelo : [''],
      marca : [''],
      cor : [''],
      placa : [''],
    })
  }

  getCars(){
    this.service.getCars().subscribe(data =>{
      this.cars = data.cars.carros
      this.dataSource = this.cars
   })
  }

  insertCar(){
    var car;
    this.service.insertCar(car).subscribe(response =>{
      console.log(response)
    })
  }

  updateCar(){
    var car;
    this.service.updateCar(car).subscribe(response =>{
      console.log(response)
    })
  }

  deleteCar(){
    let json = '{"id":'+this.id+'}';
    let obj = JSON.parse(json);
    this.service.deleteCar(obj).subscribe(response =>{
      console.log(response)
    })
  }

  setLineValues(row){
    this.buttonsControl = false;
    this.id = row.id;
    console.log(this.id)
    this.form.controls['modelo'].setValue(row.modelo);
    this.form.controls['marca'].setValue(row.marca);
    this.form.controls['cor'].setValue(row.cor);
    this.form.controls['placa'].setValue(row.placa);
 }

  cleanForm(){
    this.buttonsControl = true;
    this.id = null;
    console.log(this.id)
    this.form.controls['modelo'].setValue('');
    this.form.controls['marca'].setValue('');
    this.form.controls['cor'].setValue('');
    this.form.controls['placa'].setValue('');
  }
}


