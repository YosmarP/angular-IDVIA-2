import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  categorias: any = [];
  categorias2: any = [
    {
      "idCategoria": 1,
      "nombreCategoria": "Ingenieros",
      "datosCategoria": "1,3,4",
      "colorCategoria": "#24e5d5"
    },
    {
      "idCategoria": 2,
      "nombreCategoria": "Obreros",
      "datosCategoria": "-1,2,3",
      "colorCategoria": "#1d2cb0"
    },
    {
      "idCategoria": 3,
      "nombreCategoria": "Jefe de Obra",
      "datosCategoria": "3,2.5,1",
      "colorCategoria": "#817eff"
    }
  ];//
  color = "black";
  categoriaForm: FormGroup;
  categoria: any;
  nombreCat: string;
  datosCat: string;
  idCategoria: string;
  textButton: string;
  idCategoria2: 0;

  constructor(protected categoriaService: CategoriaService, public fb: FormBuilder, private route: ActivatedRoute) {
    this.textButton = "Agregar";
    this.obtenerParametroUrl();
    this.categoriaForm = this.fb.group({
      idCategoria: [''],
      nombreCategoria: ['', Validators.required],
      datosCategoria: ['', Validators.required],
      colorCategoria: ['']
    });
    localStorage.setItem('array',  JSON.stringify(this.categorias2));
  }

  ngOnInit(): void {
    this.getCategorias();
  }

  obtenerParametroUrl() {
    this.route.paramMap.subscribe(params => {
      this.idCategoria = params.get('idCategoria');
      if (this.idCategoria) {
        this.categoriaService.getCategoria(this.idCategoria).subscribe(res => {
          this.color = res[0].COLOR_CATE;
          this.datosCat = res[0].DATOS_CATE;
          this.nombreCat = res[0].NOMBRE_CATE;
          this.categoriaForm.patchValue({
            idCategoria: [this.idCategoria],
            nombreCategoria: [this.nombreCat],
            datosCategoria: [this.datosCat],
            colorCategoria: [this.color]
          });
          this.textButton = "Actualizar";
        });
      }
    });
  }


  getCategorias() {/*
    this.categoriaService.getCategorias().subscribe(res => {
      this.categorias = res;
    }); */
  }

  agregarCategoria() {
      this.categoriaForm.controls['colorCategoria'].setValue(this.color);
      this.categoria = this.categoriaForm.value;
//      this.categoria.idCategoria= this.categoria.length + 1;

      if (!this.idCategoria) {/*
      this.categoriaService.guardarCategoria(this.categoria).subscribe(res => {
        console.log(res);
        this.getCategorias();
      });*/
      this.categoria.idCategoria=this.categorias2.length+1;
      //console.log(this.categoria);
      this.categorias2.push(this.categoria);
      //console.log(this.categorias2);
    }
    else {
     /* this.categoriaService.actualizarCategoria(this.categoria).subscribe(res =>{
        console.log(res);
        this.getCategorias();
      });*/
    }
    localStorage.setItem('array',  JSON.stringify(this.categorias2));
  }

  borrarCategoria(id) {
    //this.categorias2.splice(id-1,1);
    var c=this.categorias2;
    c.forEach(function (item,index) {
      if (item.idCategoria === id ) {
        c.splice(index,1);
      }
    });
    console.log(c);
    this.categorias2=c;
    localStorage.setItem('array',  JSON.stringify(this.categorias2));

    /*this.categoriaService.borrarCategoria(idCategoria).subscribe(res => {
      console.log(res);
      this.getCategorias();
    })*/
    
  }

}
