import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { Label } from 'ng2-charts';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit {
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[];
  public chartColors;

  private categoria;
  private dato: string;
  private datos = [];
  private nombreCategoria = [];
  private colores = [];

  constructor(protected categoriaService: CategoriaService) {
    this.getCategoria();
  }

  ngOnInit() {
  }

  getCategoria() {

    console.log(JSON.parse(localStorage.getItem('array')));
      this.categoria = JSON.parse(localStorage.getItem('array'));
      for (const cate of this.categoria) {
        this.dato = cate.datosCategoria.split(',');
        this.datos.push(this.dato);
        this.nombreCategoria.push(cate.nombreCategoria);
        this.colores.push(cate.colorCategoria);
      }
      console.log(this.datos);
      console.log(this.nombreCategoria);
      console.log(this.colores);
      this.cargarDatos(this.datos, this.nombreCategoria, this.colores);
    /*
    this.categoriaService.getCategorias().subscribe(res => {
      
    });
    */    
  }

  cargarDatos(datos, nombreCategoria, colores) {
    this.barChartData = [];
    this.chartColors = [];

    for (var index in datos) {
      console.log(typeof(index));
      this.barChartData.push({ data: datos[index], label: nombreCategoria[index] });
      console.log(index);
      this.chartColors.push({backgroundColor: colores[index]});
    }

  }

}
