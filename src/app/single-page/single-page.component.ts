import {MatSnackBar} from '@angular/material/snack-bar';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SinglePageService } from '../service/single-page.service';


@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})


export class SinglePageComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['modelo', 'marca', 'cor', 'placa'];
  dataSource = new MatTableDataSource<any>();
  form:FormGroup;
  id: number;
  buttonsControl : boolean = true;
  snackBarMessage : string;
  cars;

  constructor(private formBuilder :FormBuilder,
    private service: SinglePageService,
    private snackBar: MatSnackBar 
    ) { }

  ngOnInit()  {
    this.buldForm();
    this.getCars();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buldForm(){
    this.form = this.formBuilder.group({
      modelo : ['', [Validators.required]],
      marca : ['' ,[Validators.required]],
      cor : ['', [Validators.required]],
      placa : ['',[Validators.required]],
    })
  }

  formValid(hasID){
    if (this.form.valid) {
      if(!hasID){this.id = 0}
      let body = { 
          "id": this.id.toString(),
          "modelo" : this.form.value.modelo.toString(),
          "marca": this.form.value.marca.toString(),
          "cor": this.form.value.cor.toString(),
          "placa": this.form.value.placa.toString()
        }
      return body
      }
  	}

  getCars(){
    this.service.getCars().subscribe(data =>{
      this.cars = data.cars.carros
      this.dataSource = this.cars
   })
  }
  
  insertCar(){
      if(this.formValid(false) != null){
        let car = this.formValid(false);
        this.service.insertCar(car).subscribe(response =>{
        this.snackBar.open(response.message, "fechar");
          this.cleanForm();
          this.getCars();
        });
      }
    }

  updateCar(){
      let car = this.formValid(true);
      this.service.updateCar(car).subscribe(response =>{
        this.snackBar.open(response.message, "fechar");
        this.cleanForm();
        this.getCars();
      });
    }

  deleteCar(){
    this.service.deleteCar(this.id).subscribe(response =>{
      this.snackBar.open(response.message, "fechar");
      this.cleanForm();
      this.getCars();
    })
  }

    setLineValues(row){
      this.buttonsControl = false;
      this.id = row.id;
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

    handleError = (controlName: string, errorName: string) => {
        return this.form.controls[controlName].hasError(errorName);
    }
  }


