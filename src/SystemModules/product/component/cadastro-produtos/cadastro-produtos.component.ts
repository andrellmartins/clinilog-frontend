import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PositionConstants } from 'src/config/constants/position.constants';
import { FormValidator } from 'src/config/formvalidator/form-validator';
import { ProductService } from 'src/SystemModules/product/service/product.service';
import { Batch } from '../../model/batch';
import { Medicine } from '../../model/medicine';
import { Product } from '../../model/product';
import { BatchService } from '../../service/batch.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit, AfterContentChecked {

  //DTO e FORMDTO
  productDTO!:Product;
  productDTOForm!:FormGroup;

  //parametros de entrara
  private idProduct!:number|null;
  private tpAcao!:string|null;

  //semaforos
  private formFullyLoaded = false;

  //Input View
  @ViewChild("swalService") swalService!:SwalComponent;

  constructor(
    private productService : ProductService  ,
    private batchService   : BatchService    ,
    private route          :  ActivatedRoute
  ) {
    this.iniciarVariaveis();
    this.iniciarProuductFormValidator();

   }

  ngOnInit(): void { }

  ngAfterContentChecked():void {
    if(this.formFullyLoaded === false){
      this.consultarProduto();
      this.formFullyLoaded = true;
    }
  }
  iniciarVariaveis(){
    this.productDTO = new Product();
    this.productDTO.medicamento = new Medicine;
  }
  
  iniciarProuductFormValidator(){
    this.productDTOForm = new FormGroup({
      product_descricao: new FormControl('',[FormValidator.required,]),
      qtd_minima:        new FormControl('',[FormValidator.required,]),
      tipo_produto: new FormControl('',[FormValidator.required,]),
      med_principio: new FormControl('',[FormValidator.required,]),
    });

    this.productDTOForm.valueChanges
    .subscribe((currentProductDTOForm:any) => {
      this.productDTO.descricao =  currentProductDTOForm?.product_descricao;
      this.productDTO.qtd_minima =  currentProductDTOForm?.qtd_minima;
      this.productDTO.isMed  =  this.isMed();
      if(this.productDTO.isMed){
        if(this.productDTO.medicamento == null){
          this.productDTO.medicamento = new Medicine;
        }
        this.productDTO.medicamento.principio_ativo = currentProductDTOForm?.med_principio;
      }else{
        this.productDTO.medicamento = undefined;
      }
      console.log(this.productDTO);
    });
  }
  isMed() {
    return (this.productDTOForm.get("tipo_produto")?.value == "medicamento" );
  }

  consultarProduto(){
    this.route.paramMap.subscribe({
      next:(params) => {
        console.log(params)
        const nrUsrParam = params.get('idProduto');
        const tpAcaoParam = params.get('tpAcao');
        if(  nrUsrParam != null && typeof nrUsrParam !== 'undefined'
          && tpAcaoParam != null && typeof tpAcaoParam !== 'undefined'
        ){
          this.idProduct  = Number.parseInt(nrUsrParam)
          this.tpAcao = tpAcaoParam;
          
          this.productService.consultaProduto(this.idProduct).subscribe({
            next: (e:Product) => {
              console.log(JSON.stringify(e));
              
              this.carregarProdutoInForm(e);
              this.validarAcaoForm();

              this.swalService.titleText = "Produto Carregado com Sucesso!";
              this.swalService.text = "";
              this.swalService.icon = "success";
              this.swalService.fire();
            },
            error: (err:HttpErrorResponse) => {
              this.swalService.titleText = "Erro Ao Consultar Produto"
              this.swalService.text = `${err.error.error} : ${err.error.message} \n `
              this.swalService.icon = "error"
              this.swalService.fire();
            }
          });
        }
      }
    });
  }

  carregarProdutoInForm(produto:Product){
    this.productDTO.id = produto.id;
    this.productDTOForm.get('product_descricao')?.setValue(produto.descricao)
    this.productDTOForm.get('qtd_minima')?.setValue(produto.qtd_minima)
    this.productDTOForm.get('tipo_produto')?.setValue(produto.isMed ? 'medicamento' : 'insumo')
    if(produto.medicamento != null){
      this.productDTO.medicamento = new Medicine;
      this.productDTO.medicamento.id = produto.medicamento.id
      this.productDTOForm.get('med_principio')?.setValue(produto.medicamento.principio_ativo)
    }
    if(produto.lote != null){
      this.productDTO.lote = produto.lote;
    }
  }

  validarAcaoForm(){
    if(this.isVisualizar() || this.isManagingBatches()){
      this.productDTOForm.disable();
    }
  }

  fazerCadastroProdutos(){
    this.productService.cadastrarProduto(this.productDTO)
    .subscribe({
      next:(product:Product) => {
        this.swalService.titleText = "Sucesso na Operação ";
        this.swalService.text = "Produto " + product.descricao + " !";
        this.swalServiceClose = () => {
          window.location.href = '/inicio/produtos/';
        }
        if(this.isManagingBatches()){
          this.swalService.text = "Lotes do produto " + product.descricao + " cadastrados com sucesso !";
          this.swalServiceClose = () => {
            this.carregarProdutoInForm(product)
          }
        }
        this.swalService.icon = "success";
        this.swalService.fire();
      },
      error:(err:HttpErrorResponse) => {
        console.log(err)
        this.swalService.titleText = "Falha ao Cadastrar";
        this.swalService.text = "Produto " + this.productDTO.descricao + " Não foi Cadastrado! "
        if(this.isManagingBatches()){
          this.swalService.text = "Lotes do produto " + this.productDTO.descricao + " Não foram salvos! ";
        }
        this.swalService.text += "\n Mensagem:" + err.message;
        this.swalService.icon = "error";
        this.swalServiceClose = () => {}
        this.swalService.fire();
      }
    });
  }
  
  fazerCadastroLotes(){
    if(this.productDTO.lote == null || this.productDTO.lote == undefined){
      return;
    }
    this.batchService.cadastrarLotes(this.productDTO.id, this.productDTO.lote)
    .subscribe({
      next:(product:boolean) => {
        if(!product){
          throw new HttpErrorResponse({
            error:"Não foi possível cadastrar os Lotes.",
          });
        }
        this.swalService.titleText = "Sucesso na Operação ";
        this.swalService.text = "Lotes do Produto " + this.productDTO.descricao + " Salvos!";
        this.swalService.icon = "success";
        this.swalServiceClose = () => {
          window.location.href = '/inicio/produtos/';
        }
        this.swalService.fire();
      },
      error:(err:HttpErrorResponse) => {
        console.log(err)
        this.swalService.titleText = "Falha ao Salvar Lotes";
        this.swalService.text = "Lotes do Produto " + this.productDTO.descricao + " Não foram Salvos! \n Mensagem:" + err.message;
        this.swalService.icon = "error";
        this.swalServiceClose = () => {}
        this.swalService.fire();
      }
    });
  }

  swalServiceClose = () => {};


  isEditing():boolean{
    return this.tpAcao == 'editar';
  }
  isVisualizar():boolean{
    return this.tpAcao == 'visualizar';
  }

  isManagingBatches():boolean{
    return this.tpAcao == 'manageBatches';
  }

  deletarLoteAtual(idLote:number){
    console.log(this.productDTO.lote, idLote);
    console.log(this.productDTO.lote !== undefined && this.productDTO.lote[idLote] !== undefined)
    if( this.productDTO.lote !== undefined && 
        this.productDTO.lote[idLote] !== undefined
    ){
      this.productDTO.lote?.splice(idLote, 1);  
    }
  }
  cadastrarNovoLote(){
    if(this.productDTO.lote == null){
      this.productDTO.lote = [];
    }
    this.productDTO?.lote?.push(new Batch);
  }

  getActionButtonText(){
    if(this.isEditing()){
      return 'Editar';
    }
    if(this.isManagingBatches()){
      return 'Salvar Lotes';
    }
    return 'Cadastrar';
  }

  actionButtonSubmit(){
    this.fazerCadastroProdutos();
    
  }


}
