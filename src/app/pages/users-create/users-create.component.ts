import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { VieworderComponent } from '../popup/vieworder/vieworder.component';
import { DeleteorderComponent } from '../popup/deleteorder/deleteorder.component';
import { EditorderComponent } from '../popup/editorder/editorder.component';
import { CreateUserComponent } from '../popup/create-user/create-user.component';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent {
  openOrdersmenu:boolean=false
  openProductsmenu:boolean=false
  openUsersmenu:boolean=false
  openReportsmenu:boolean=false
  UserName:string = ""
  users:any={}
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
      this.getUsers()
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
  getUsers(): void {
    this.spinner.show();
    const observer = {
      next: (data: any) => {
        this.spinner.hide();
        this.users = data;
        console.log(data);
        this.filterOrders();
      },
      error: (error: any) => {
        this.spinner.hide();
        console.error('Error retrieving transaction:', error);
      },
    };
    console.log(this.users.length);
    this.loginservice.getusersList().subscribe(observer);
  }

  filterOrders(): void {
    this.filteredOrders = this.users.filter((order: any) => order.status != 'shipped');
    console.log(this.filteredOrders);
  }

  filterOrdersByCriteria(orderId: string, name: string, email: string): void {
    this.filteredOrders = this.users.filter((order: any) => {
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


  addUser( ){
    const modalRef = this.modalService.open(CreateUserComponent, {
      size: 'md',
    });

      modalRef.result.then(
        (result) => {
          console.log('Modal closed with result:', result);
          if(result=="confirm"){
             this.users = {}
             this.getUsers()
            setTimeout(() => {
            }, 100);
          }
        },
        (reason) => {
          console.log('Modal dismissed with reason:', reason);
        }
        )
  }

}
