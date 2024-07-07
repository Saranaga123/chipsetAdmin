import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { VieworderComponent } from '../popup/vieworder/vieworder.component';
import { DeleteorderComponent } from '../popup/deleteorder/deleteorder.component';
import { EditorderComponent } from '../popup/editorder/editorder.component';


@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent {
  openOrdersmenu:boolean=false
  openProductsmenu:boolean=false
  openUsersmenu:boolean=false
  openReportsmenu:boolean=false
  UserName:string = ""
  orders:any={}
  orderId = ""
  cusName = ""
  cusEmail = ""
  filteredOrders:any={}
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService : NgbModal,
    private loginservice : LoginService
  ) {

  }

  ngOnInit(): void {
    this.getUserData()

  }
  getUserData(){
    const userdata = sessionStorage.getItem("userdata")
    if(userdata){
      let dataObj = JSON.parse(userdata)
      this.UserName = dataObj.name
      this.getOrders()
    }else{
      this.logout()
    }
  }
  logout(){
    sessionStorage.removeItem("userdata");
    this.router.navigate(['/login']);
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
  getOrders(): void {
    this.spinner.show();
    const observer = {
      next: (data: any) => {
        this.spinner.hide();
        this.orders = data;
        console.log(data);
        this.filterOrders();
      },
      error: (error: any) => {
        this.spinner.hide();
        console.error('Error retrieving transaction:', error);
      },
    };
    console.log(this.orders.length);
    this.loginservice.getAllOrders().subscribe(observer);
  }
  getOrdersAfterDelete(): void {
    this.spinner.show();
    const observer = {
      next: (data: any) => {
        this.spinner.hide();
        this.orders = data;
        console.log(data);
        setTimeout(() => {
          this.filterOrdersByCriteria(this.orderId,this.cusName,this.cusEmail)
        }, 500);


      },
      error: (error: any) => {
        this.spinner.hide();
        console.error('Error retrieving transaction:', error);
      },
    };
    console.log(this.orders.length);
    this.loginservice.getAllOrders().subscribe(observer);
  }

  filterOrders(): void {
    this.filteredOrders = this.orders.filter((order: any) => order.status != 'shipped');
    console.log(this.filteredOrders);
  }

  filterOrdersByCriteria(orderId: string, name: string, email: string): void {
    this.filteredOrders = this.orders.filter((order: any) => {
      return (
        order.status !=  'shipped' &&
        (!orderId || order.id.includes(orderId)) &&
        (!name || order.name.includes(name)) &&
        (!email || order.email.includes(email))
      );
    });
    console.log(this.filteredOrders);
  }
  clearFilters(){
    this.orderId = ""
    this.cusEmail=""
    this.cusName = ""
    this.filteredOrders = this.filteredOrders.filter((order: any) => {
      return (
        order.status != 'shipped' &&
        (!this.orderId || order.id.includes(this.orderId)) &&
        (!this.cusName || order.name.includes(this.cusName)) &&
        (!this.cusEmail || order.email.includes(this.cusEmail))
      );
    });
    console.log(this.filteredOrders);
  }
  editOrder(model:any){
    const modalRef = this.modalService.open(EditorderComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.data = model;
      modalRef.result.then(
        (result) => {
          console.log('Modal closed with result:', result);
          if(result=="confirm"){
            this.filteredOrders = ""
            this.orders=""
            setTimeout(() => {
              this.getOrdersAfterDelete()
            }, 100);


          }
        },
        (reason) => {
          console.log('Modal dismissed with reason:', reason);
        }
        )
  }
  ViewOrder(model:any){
    const modalRef = this.modalService.open(VieworderComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.data = model;
      modalRef.result.then(
        (result) => {
          console.log('Modal closed with result:', result);
        },
        (reason) => {
          console.log('Modal dismissed with reason:', reason);
        }
        )
  }
  deleteOrder(model:any){
    const modalRef = this.modalService.open(DeleteorderComponent, {
      size: 'xl',
      centered: true
    });
    modalRef.componentInstance.data = model;
      modalRef.result.then(
        (result) => {
          console.log('Modal closed with result:', result);
          if(result=="confirm"){
            this.filteredOrders = ""
            this.orders=""
            setTimeout(() => {
              this.getOrdersAfterDelete()
              this.spinner.hide();
            }, 100);


          }
        },
        (reason) => {
          console.log('Modal dismissed with reason:', reason);
        }
        )
  }

}
