import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.scss']
})
export class HolderComponent {
  openTasksmenu:boolean=false
  openOrdersmenu:boolean=false
  openProductsmenu:boolean=false
  openUsersmenu:boolean=false
  openReportsmenu:boolean=false
  selectMYTask:boolean=false
  activemenuobj:any={}
  selectCreateTasks:boolean=false
  PendingOrders:boolean=false
  NewOrder:boolean=false
  OrdersExtract:boolean=false
  AddProduct:boolean=false
  EditProduct:boolean=false
  ProductsExtract:boolean=false
  UserCreate:boolean=false
  UserUpdate:boolean=false
  UsersExtract:boolean=false
  GenerateInvoice:boolean=false
  GenerateCompanyInvoice:boolean=false
  Filters:boolean=false
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService : NgbModal,
  ) {
    // this.spinner.show()
  }
  ngOnInit(): void {
    this.activemenuobj = sessionStorage.getItem("menuobj")
    if (this.activemenuobj){
      this.activemenuobj = JSON.parse(this.activemenuobj)
      this.openTasksmenu= this.activemenuobj.openTasksmenu
      this.openOrdersmenu= this.activemenuobj.openOrdersmenu
      this.openProductsmenu= this.activemenuobj.openProductsmenu
      this.openUsersmenu= this.activemenuobj.openUsersmenu
      this.openReportsmenu= this.activemenuobj.openReportsmenu
      this.selectMYTask= this.activemenuobj.selectMYTask
      this.selectCreateTasks= this.activemenuobj.selectCreateTasks
      this.PendingOrders= this.activemenuobj.PendingOrders
      this.NewOrder= this.activemenuobj.NewOrder
      this.OrdersExtract= this.activemenuobj.OrdersExtract
      this.AddProduct= this.activemenuobj.AddProduct
      this.EditProduct= this.activemenuobj.EditProduct
      this.ProductsExtract= this.activemenuobj.ProductsExtract
      this.UserCreate= this.activemenuobj.UserCreate
      this.UserUpdate= this.activemenuobj.UserUpdate
      this.UsersExtract= this.activemenuobj.UsersExtract
      this.GenerateInvoice= this.activemenuobj.GenerateInvoice
      this.GenerateCompanyInvoice= this.activemenuobj.GenerateCompanyInvoice
    }else{
      this.activemenuobj = {
        openTasksmenu:true,
        openOrdersmenu:false,
        openProductsmenu:false,
        openUsersmenu:false,
        openReportsmenu:false,
        selectMYTask:true,
        CreateTasks:false,
        PendingOrders:false,
        NewOrder:false,
        OrdersExtract:false,
        AddProduct:false,
        EditProduct:false,
        ProductsExtract:false,
        UserCreate:false,
        UserUpdate:false,
        UsersExtract:false,
        GenerateInvoice:false,
        GenerateCompanyInvoice:false,
        Filters:false,
      }
      this.openTasksmenu=true
      this.selectMYTask=true
    }
  }
  resetmenu(){
    this.openTasksmenu= this.activemenuobj.openTasksmenu
      this.openOrdersmenu= this.activemenuobj.openOrdersmenu
      this.openProductsmenu= this.activemenuobj.openProductsmenu
      this.openUsersmenu= this.activemenuobj.openUsersmenu
      this.openReportsmenu= this.activemenuobj.openReportsmenu
      this.selectMYTask= this.activemenuobj.selectMYTask
      this.selectCreateTasks= this.activemenuobj.selectCreateTasks
      this.PendingOrders= this.activemenuobj.PendingOrders
      this.NewOrder= this.activemenuobj.NewOrder
      this.OrdersExtract= this.activemenuobj.OrdersExtract
      this.AddProduct= this.activemenuobj.AddProduct
      this.EditProduct= this.activemenuobj.EditProduct
      this.ProductsExtract= this.activemenuobj.ProductsExtract
      this.UserCreate= this.activemenuobj.UserCreate
      this.UserUpdate= this.activemenuobj.UserUpdate
      this.UsersExtract= this.activemenuobj.UsersExtract
      this.GenerateInvoice= this.activemenuobj.GenerateInvoice
      this.GenerateCompanyInvoice= this.activemenuobj.GenerateCompanyInvoice
  }
  openTasks(){
    if(this.openTasksmenu){
      this.openTasksmenu = !this.openTasksmenu
    }else{
      this.openTasksmenu = true
    }
  }
  openMyTasks(){
    let menuobj = {
      openTasksmenu:true,
      openOrdersmenu:false,
      openProductsmenu:false,
      openUsersmenu:false,
      openReportsmenu:false,
      selectMYTask:true,
      selectCreateTasks:false,
      PendingOrders:false,
      NewOrder:false,
      OrdersExtract:false,
      AddProduct:false,
      EditProduct:false,
      ProductsExtract:false,
      UserCreate:false,
      UserUpdate:false,
      UsersExtract:false,
      GenerateInvoice:false,
      GenerateCompanyInvoice:false,
      Filters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.resetmenu()
  }
  opencreateTasks(){
    let menuobj = {
      openTasksmenu:true,
      openOrdersmenu:false,
      openProductsmenu:false,
      openUsersmenu:false,
      openReportsmenu:false,
      selectMYTask:false,
      selectCreateTasks:true,
      PendingOrders:false,
      NewOrder:false,
      OrdersExtract:false,
      AddProduct:false,
      EditProduct:false,
      ProductsExtract:false,
      UserCreate:false,
      UserUpdate:false,
      UsersExtract:false,
      GenerateInvoice:false,
      GenerateCompanyInvoice:false,
      Filters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.resetmenu()
  }
  openOrders(){
    if(this.openOrdersmenu){
      this.openOrdersmenu = !this.openOrdersmenu
    }else{
      this.openOrdersmenu = true
    }
  }
  openProducts(){
    if(this.openProductsmenu){
      this.openProductsmenu = !this.openProductsmenu
    }else{
      this.openProductsmenu = true
    }
  }
  openUsers(){
    if(this.openUsersmenu){
      this.openUsersmenu = !this.openUsersmenu
    }else{
      this.openUsersmenu = true
    }
  }
  openReports(){
    if(this.openReportsmenu){
      this.openReportsmenu = !this.openReportsmenu
    }else{
      this.openReportsmenu = true
    }
  }
}
