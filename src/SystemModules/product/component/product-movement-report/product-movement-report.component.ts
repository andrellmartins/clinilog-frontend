import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend, ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { map } from 'rxjs';
import { FormValidator } from 'src/config/formvalidator/form-validator';
import { Batch } from '../../model/batch';
import { Product } from '../../model/product';
import { ProductMovement } from '../../model/product-movement';
import { ReportProductMovementDTO } from '../../model/report-product-movement-dto';
import { ProductMovementService } from '../../service/product-movement.service';
import { ProductService } from '../../service/product.service';

export type ChartOptions = {
  series     : ApexAxisChartSeries ,
  chart      : ApexChart           ,
  xaxis      : ApexXAxis           ,
  stroke     : ApexStroke          ,
  dataLabels : ApexDataLabels      ,
  markers    : ApexMarkers         ,
  tooltip    : any                 , // ApexTooltip
  //yaxis      : ApexYAxis           ,
  grid       : ApexGrid            ,
  legend     : ApexLegend          ,
  title      : ApexTitleSubtitle   ,
}

@Component({
  selector: 'app-product-movement-report',
  templateUrl: './product-movement-report.component.html',
  styleUrls: ['./product-movement-report.component.css']
})
export class ProductMovementReportComponent implements OnInit, OnChanges{
  @ViewChild("chart") chartEntrada!: ChartComponent;
  @ViewChild("chart") chartSaida!: ChartComponent;
  @ViewChild("chart") chartConciliado!: ChartComponent;

  public chartOptionsEntrada!:ChartOptions;
  public chartOptionsSaida!:ChartOptions;
  public chartOptionsConciliado!:ChartOptions;

  
  
  private produtosReport:Map<number,Product> = new Map();
  private minDateReport!:Date;
  private maxDateReport!:Date;
  private rangeDatasReport:string[] = [];
  private dataReport:Map<number, Map<number,ProductMovement[]>> = new Map();
  

  constructor(
    private productService:ProductService,
    private productMovementService:ProductMovementService,
  ) {}

  public produtos!:Product[];
  public lotes!:Batch[];
  
  public filtroRelatorioForm!:FormGroup;
  private filtroRelatorioDTO!:ReportProductMovementDTO;

  ngOnInit(): void {
    this.carregarProdutos();
    this.filtroRelatorioForm = new FormGroup({
      produtos:       new FormControl<Product[] > ([]    ),
      lotes:          new FormControl<Batch[]   > ([]    ),
      conciliar_lote: new FormControl<boolean   > (false ),
      data_inicio:    new FormControl             (''    ),
      data_fim:       new FormControl             (''    ),
    });

    this.filtroRelatorioForm.valueChanges
    .subscribe((currentProductDTOForm:any) => {
      this.filtroRelatorioDTO = {
        produtos        :currentProductDTOForm.produtos        ,
        lotes           :currentProductDTOForm.lotes           ,
        conciliar_lote  :currentProductDTOForm.conciliar_lote  ,
        data_inicio     :currentProductDTOForm.data_inicio     ,
        data_fim        :currentProductDTOForm.data_fim        ,
      }
      this.onChangeProdutos()
      console.log('1');
      this.atualizaGraficos();
    });
    this.atualizaGraficos();

  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }

  carregarProdutos() {
    this.productService.consultaProdutos().subscribe( produtos => { this.produtos = produtos })
  }

  onChangeProdutos(){
    console.log(this.filtroRelatorioDTO);
    this.lotes = [];
    if(this.permiteFiltroLote()){
      for (let produto of this.filtroRelatorioDTO.produtos) {
        if(produto.lote != null){
          this.lotes.push(...produto.lote);
        }
      }
    }
    console.log(this.lotes);
  }

  permiteFiltroLote(){
    return this.filtroRelatorioDTO                         != null
        && this.filtroRelatorioDTO.produtos                != null
        && this.filtroRelatorioDTO.produtos.length         == 1
        && this.filtroRelatorioDTO.produtos[0].lote        != null
        && this.filtroRelatorioDTO.produtos[0].lote.length >  0;
  }
  
  semLotesCadastradosNoProdutoSelecionado(){
    return this.filtroRelatorioDTO                          != null
        && this.filtroRelatorioDTO.produtos                 != null
        && this.filtroRelatorioDTO.produtos.length          == 1
        && this.filtroRelatorioDTO.produtos[0].lote?.length == 0;
  }

  atualizaGraficos(){
    this.produtosReport = new Map()
    this.rangeDatasReport = [];
    this.dataReport = new Map;

    let reiniciarDataInicio: boolean, 
        reiniciarDataFim: boolean;
        
    reiniciarDataFim    = 
    reiniciarDataInicio = true;

    this.productMovementService.consultaDadosGrafico(
      this.filtroRelatorioDTO
    )
    .subscribe({
      next:(response)=>{
        //percorrer array de movimentações
        response.forEach((productMovement:ProductMovement) => {
          let produto           :Product = productMovement.product                 ,
              dataCadastroFull  :Date    = new Date(productMovement.data_cadastro) ,
              dataCadastro      :Date    = new Date(`${dataCadastroFull.getFullYear()}-${dataCadastroFull.getMonth() + 1}-${dataCadastroFull.getDate()}`),
              dataCadastroKey   :number  = dataCadastro.getTime();
        //this part makes the unique product array.
          if(!this.produtosReport.has(produto.id)){
            this.produtosReport.set(produto.id,produto);
          }

        //this part mounts the dataRange.
          //min-data
          if( reiniciarDataInicio || this.minDateReport === undefined || this.minDateReport > dataCadastro){
            this.minDateReport = dataCadastro;
            reiniciarDataInicio = false;
          }
          //max-data
          if( reiniciarDataFim || this.maxDateReport === undefined || this.maxDateReport < dataCadastro){
            this.maxDateReport = dataCadastro;
            reiniciarDataFim = false;
          }
        //end dataRange
        //reportData - grouped by productId
          if(!this.dataReport.has(produto.id)){
            this.dataReport.set(produto.id,new Map);
          }

          if(!this.dataReport.get(produto.id)?.has(dataCadastroKey)){
            this.dataReport.get(produto.id)?.set(dataCadastroKey, []);
          }

          this.dataReport.get(produto.id)?.get(dataCadastroKey)?.push(productMovement);
        //end reportData Group
        });

        //percorre o range de datas
        let minDateCopy:Date = new Date(this.minDateReport);
        
        while(minDateCopy <= this.maxDateReport){
          //preenche array de range de datas para usar na categoria
          this.rangeDatasReport.push(`${minDateCopy.getFullYear()}-${minDateCopy.getMonth() + 1}-${minDateCopy.getDate()}`);
          //preenche as lacuas nos maps de produtos.
          this.dataReport.forEach((produtoMovementsByDate, key) => {
            if(!produtoMovementsByDate.has(minDateCopy.getTime())){
              produtoMovementsByDate.set(minDateCopy.getTime(),[]);
            }
          });
          //avança um dia
          minDateCopy.setDate(minDateCopy.getDate() + 1);
        }

        this.chartOptionsEntrada    = this.setChartGrafico(
          (acumulador, movimentacao) => acumulador + (movimentacao.qtd_movimentada > 0 ? movimentacao.qtd_movimentada : 0),
          'Relatorio de Movimentações de Entrada'
        );
        this.chartOptionsSaida      = this.setChartGrafico(
          (acumulador, movimentacao) => acumulador + (movimentacao.qtd_movimentada < 0 ? movimentacao.qtd_movimentada : 0),
          'Relatorio de Movimentações de Saída'
        );
        this.chartOptionsConciliado = this.setChartGrafico(
          (acumulador, movimentacao) => acumulador + movimentacao.qtd_movimentada,
          'Relatorio de Movimentações Conciliadas'
        );

        // (acumulador, movimentacao) => acumulador + (movimentacao.qtd_movimentada > 0 ? movimentacao.qtd_movimentada : 0)
    // (acumulador, movimentacao) => acumulador + (movimentacao.qtd_movimentada < 0 ? movimentacao.qtd_movimentada : 0)
    // (acumulador, movimentacao) => acumulador + movimentacao

        
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{
        console.log('finish')
      }
    })
  }
  setChartGrafico(
    funcAcumula:(n:number, pm:ProductMovement) => number,
    titleChart:string
  ):ChartOptions{
    let chartReport:{name:string, data:number[]}[] = [];

    //iterar sobre os produtos e sobre as datas e gerar os dados para o gráfico no padrão.
    let currentIndex = 0;
    this.dataReport.forEach((productMovementsByDate, idProduct) => {
      console.log(productMovementsByDate, idProduct);
      let productName:string|undefined = this.produtosReport.get(idProduct)?.descricao;
      if(productName === undefined ){
        return;
      }
      let minDateCopy:Date = new Date(this.minDateReport);
      let acumuladoPeriodo:number = 0;
      while(minDateCopy <= this.maxDateReport){
        console.log(minDateCopy);
        let productMovementArray:ProductMovement[]|undefined = productMovementsByDate.get(minDateCopy.getTime());
        if(productMovementArray === undefined){ continue; }
        if(chartReport[currentIndex] === undefined){
          chartReport[currentIndex] = {
            name:productName,
            data:[]
          }
        } 
        acumuladoPeriodo += productMovementArray.reduce(funcAcumula, 0)
        chartReport[currentIndex].data.push(
          acumuladoPeriodo
        );
        minDateCopy.setDate(minDateCopy.getDate() + 1);
      }
      currentIndex ++;
    })

    
    return this.getChartOptions(
      chartReport, 
      this.rangeDatasReport,
      titleChart
    );
  }

  getChartOptions(
    chartReport:{name:string, data:number[]}[], 
    rangeDatasReport:string[],
    titleChart:string
  ):ChartOptions{
    return {
      series: chartReport,
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: titleChart,
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val:any, opts:any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        type:'datetime',
        categories: rangeDatasReport
      },
      tooltip: {
        
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }

}

