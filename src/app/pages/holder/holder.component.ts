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
  ReportFilters:boolean=false

  navLevel1:string=""
  navLevel2:string=""
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
        ReportFilters:false,
      }
      this.openTasksmenu=true
      this.selectMYTask=true

    }
    this.setNav()
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
    this.setNav()
  }
  setNav(){
    if (this.openTasksmenu){
      this.navLevel1="Tasks"
      if(this.selectMYTask){
        this.navLevel2="My Tasks"
      }else {
        this.navLevel2="Create New Tasks"
      }
    }else if (this.openOrdersmenu){
      this.navLevel1="Orders"
      if(this.PendingOrders){
        this.navLevel2="Pending Orders"
      }else if (this.NewOrder){
        this.navLevel2="New Order"
      }else{
        this.navLevel2="Orders Extract"
      }
    }else if (this.openProductsmenu){
      this.navLevel1="Products"
      if(this.AddProduct){
        this.navLevel2="Add Product"
      }else if (this.EditProduct){
        this.navLevel2="Edit Product"
      }else{
        this.navLevel2="Products Extract"
      }
    }else if (this.openUsersmenu){
      this.navLevel1="Users"
      if(this.UserCreate){
        this.navLevel2="User Create"
      }else if (this.UserUpdate){
        this.navLevel2="User Update"
      }else{
        this.navLevel2="Users Extract"
      }
    }else if (this.openReportsmenu){
      this.navLevel1="Reports"
      if (this.GenerateInvoice){
        this.navLevel2="Generate Invoice"
      }else{
        this.navLevel2="Generate Company Invoice"
      }
    }
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
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);

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
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);
  }
  openOrders(){
    if(this.openOrdersmenu){
      this.openOrdersmenu = !this.openOrdersmenu
    }else{
      this.openOrdersmenu = true
    }
  }
  openPendingOrders(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:true,
      openProductsmenu:false,
      openUsersmenu:false,
      openReportsmenu:false,
      selectMYTask:false,
      selectCreateTasks:false,
      PendingOrders:true,
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
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);
  }
  openNewOrder(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:true,
      openProductsmenu:false,
      openUsersmenu:false,
      openReportsmenu:false,
      selectMYTask:false,
      selectCreateTasks:false,
      PendingOrders:false,
      NewOrder:true,
      OrdersExtract:false,
      AddProduct:false,
      EditProduct:false,
      ProductsExtract:false,
      UserCreate:false,
      UserUpdate:false,
      UsersExtract:false,
      GenerateInvoice:false,
      GenerateCompanyInvoice:false,
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);
  }
  openOrdersExtract(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:true,
      openProductsmenu:false,
      openUsersmenu:false,
      openReportsmenu:false,
      selectMYTask:false,
      selectCreateTasks:false,
      PendingOrders:false,
      NewOrder:false,
      OrdersExtract:true,
      AddProduct:false,
      EditProduct:false,
      ProductsExtract:false,
      UserCreate:false,
      UserUpdate:false,
      UsersExtract:false,
      GenerateInvoice:false,
      GenerateCompanyInvoice:false,
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);
  }
  openProducts(){
    if(this.openProductsmenu){
      this.openProductsmenu = !this.openProductsmenu
    }else{
      this.openProductsmenu = true
    }
  }
  openAddProduct(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:false,
      openProductsmenu:true,
      openUsersmenu:false,
      openReportsmenu:false,
      selectMYTask:false,
      selectCreateTasks:false,
      PendingOrders:false,
      NewOrder:false,
      OrdersExtract:false,
      AddProduct:true,
      EditProduct:false,
      ProductsExtract:false,
      UserCreate:false,
      UserUpdate:false,
      UsersExtract:false,
      GenerateInvoice:false,
      GenerateCompanyInvoice:false,
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);

  }
  openEditProduct(){
      let menuobj = {
        openTasksmenu:false,
        openOrdersmenu:false,
        openProductsmenu:true,
        openUsersmenu:false,
        openReportsmenu:false,
        selectMYTask:false,
        selectCreateTasks:false,
        PendingOrders:false,
        NewOrder:false,
        OrdersExtract:false,
        AddProduct:false,
        EditProduct:true,
        ProductsExtract:false,
        UserCreate:false,
        UserUpdate:false,
        UsersExtract:false,
        GenerateInvoice:false,
        GenerateCompanyInvoice:false,
        ReportFilters:false,
      }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);

  }
  openProductsExtract(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:false,
      openProductsmenu:true,
      openUsersmenu:false,
      openReportsmenu:false,
      selectMYTask:false,
      selectCreateTasks:false,
      PendingOrders:false,
      NewOrder:false,
      OrdersExtract:false,
      AddProduct:false,
      EditProduct:false,
      ProductsExtract:true,
      UserCreate:false,
      UserUpdate:false,
      UsersExtract:false,
      GenerateInvoice:false,
      GenerateCompanyInvoice:false,
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);

  }

  openUsers(){
    if(this.openUsersmenu){
      this.openUsersmenu = !this.openUsersmenu
    }else{
      this.openUsersmenu = true
    }
  }
  openUsersCreate(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:false,
      openProductsmenu:false,
      openUsersmenu:true,
      openReportsmenu:false,
      selectMYTask:false,
      selectCreateTasks:false,
      PendingOrders:false,
      NewOrder:false,
      OrdersExtract:false,
      AddProduct:false,
      EditProduct:false,
      ProductsExtract:false,
      UserCreate:true,
      UserUpdate:false,
      UsersExtract:false,
      GenerateInvoice:false,
      GenerateCompanyInvoice:false,
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);

  }
  openUsersUpdate(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:false,
      openProductsmenu:false,
      openUsersmenu:true,
      openReportsmenu:false,
      selectMYTask:false,
      selectCreateTasks:false,
      PendingOrders:false,
      NewOrder:false,
      OrdersExtract:false,
      AddProduct:false,
      EditProduct:false,
      ProductsExtract:false,
      UserCreate:false,
      UserUpdate:true,
      UsersExtract:false,
      GenerateInvoice:false,
      GenerateCompanyInvoice:false,
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);

  }
  openUsersExtract(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:false,
      openProductsmenu:false,
      openUsersmenu:true,
      openReportsmenu:false,
      selectMYTask:false,
      selectCreateTasks:false,
      PendingOrders:false,
      NewOrder:false,
      OrdersExtract:false,
      AddProduct:false,
      EditProduct:false,
      ProductsExtract:false,
      UserCreate:false,
      UserUpdate:false,
      UsersExtract:true,
      GenerateInvoice:false,
      GenerateCompanyInvoice:false,
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);

  }
  openReports(){
    if(this.openReportsmenu){
      this.openReportsmenu = !this.openReportsmenu
    }else{
      this.openReportsmenu = true
    }
  }
  openReportsGenarateInvoice(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:false,
      openProductsmenu:false,
      openUsersmenu:false,
      openReportsmenu:true,
      selectMYTask:false,
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
      GenerateInvoice:true,
      GenerateCompanyInvoice:false,
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);

  }
  openReportsGenerateCompanyInvoice(){
    let menuobj = {
      openTasksmenu:false,
      openOrdersmenu:false,
      openProductsmenu:false,
      openUsersmenu:false,
      openReportsmenu:true,
      selectMYTask:false,
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
      GenerateCompanyInvoice:true,
      ReportFilters:false,
    }
    sessionStorage.setItem("menuobj",JSON.stringify(menuobj))
    this.activemenuobj = menuobj
    this.spinner.show()
    setTimeout(() => {
      this.resetmenu()
      this.spinner.hide()
    }, 1000);

  }

}
