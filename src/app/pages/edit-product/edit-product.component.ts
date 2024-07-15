import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { VieworderComponent } from '../popup/vieworder/vieworder.component';
import { DeleteorderComponent } from '../popup/deleteorder/deleteorder.component';
import { EditorderComponent } from '../popup/editorder/editorder.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewProductComponent } from '../popup/view-product/view-product.component';
import { EditProductPopComponent } from '../popup/edit-product-pop/edit-product-pop.component';
import { DeleteProductComponent } from '../popup/delete-product/delete-product.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  openOrdersmenu:boolean=false
  openProductsmenu:boolean=false
  openUsersmenu:boolean=false
  openReportsmenu:boolean=false
  UserName:string = ""
  products:any={}
  orderId = ""
  cusName = ""
  cusEmail = ""
  filteredOrders:any={}
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService : NgbModal,
    private loginservice : LoginService,
    private _sanitizer: DomSanitizer,
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
      this.getProdList()
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
  prod:any=[]
  getProdList(){
    let userlogs = sessionStorage.getItem("userdata")

      // sessionStorage.clear()
      this.prod=[]
      this.spinner.show()
      const observer = {
        next: (data: any) => {


          for(const element of data){

            const prodObj={
              id:element.id,
              name:element.name,
              userid:element.userid,
              buyerid:element.buyerid,
              description:element.description,
              available:element.available,
              status:element.status,
              category:element.category,
              price:element.price,
              image:this._sanitizer.bypassSecurityTrustResourceUrl( element.image)

            }
            this.prod.push(prodObj)

            console.log("this.displaydata",this.prod)
          }
          sessionStorage.setItem("prod",JSON.stringify(this.prod))
          this.spinner.hide()
        },
        error: (error: any) => {
          console.error('Error retrieving transaction:', error);
        },
      };

      this.loginservice.getprodList().subscribe(observer);

  }
  getProdsAfterDelete(): void {
    let userlogs = sessionStorage.getItem("userdata")

      // sessionStorage.clear()
      this.prod=[]
      const observer = {
        next: (data: any) => {


          for(const element of data){

            const prodObj={
              id:element.id,
              name:element.name,
              userid:element.userid,
              buyerid:element.buyerid,
              description:element.description,
              available:element.available,
              status:element.status,
              category:element.category,
              price:element.price,
              image:this._sanitizer.bypassSecurityTrustResourceUrl( element.image)

            }
            this.prod.push(prodObj)

            console.log("this.displaydata",this.prod)
          }
          sessionStorage.setItem("prod",JSON.stringify(this.prod))
          this.spinner.hide()
        },
        error: (error: any) => {
          console.error('Error retrieving transaction:', error);
        },
      };

      this.loginservice.getprodList().subscribe(observer);

  }

  filterProducts(): void {
    this.filteredOrders = this.products
    console.log(this.filteredOrders);
  }

  filterOrdersByCriteria(orderId: string, name: string, email: string): void {
    this.filteredOrders = this.products.filter((product: any) => {
      return (
        product.status !=  'shipped' &&
        (!orderId || product.id.includes(orderId)) &&
        (!name || product.name.includes(name)) &&
        (!email || product.email.includes(email))
      );
    });
    console.log(this.filteredOrders);
  }
  clearFilters(){
    this.orderId = ""
    this.cusEmail=""
    this.cusName = ""
    this.filteredOrders = this.filteredOrders.filter((product: any) => {
      return (
        product.status != 'shipped' &&
        (!this.orderId || product.id.includes(this.orderId)) &&
        (!this.cusName || product.name.includes(this.cusName)) &&
        (!this.cusEmail || product.email.includes(this.cusEmail))
      );
    });
    console.log(this.filteredOrders);
  }
  editOrder(model:any){
    const modalRef = this.modalService.open(EditProductPopComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.data = model;
      modalRef.result.then(
        (result) => {
          console.log('Modal closed with result:', result);
          if(result=="confirm"){
            this.filteredOrders = ""
            this.products=""
            setTimeout(() => {
              this.getProdList()
            }, 100);


          }
        },
        (reason) => {
          console.log('Modal dismissed with reason:', reason);
        }
        )
  }
  ViewOrder(model:any){
    const modalRef = this.modalService.open(ViewProductComponent, {
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
    const modalRef = this.modalService.open(DeleteProductComponent, {
      size: 'xl',
      centered: true
    });
    modalRef.componentInstance.data = model;
      modalRef.result.then(
        (result) => {
          console.log('Modal closed with result:', result);
          if(result=="confirm"){
            this.filteredOrders = ""
            this.products=""
            setTimeout(() => {
              this.spinner.show()
              this.getProdsAfterDelete()
            }, 100);


          }
        },
        (reason) => {
          console.log('Modal dismissed with reason:', reason);
        }
        )
  }

}

