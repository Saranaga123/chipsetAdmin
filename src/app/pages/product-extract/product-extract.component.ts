import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { VieworderComponent } from '../popup/vieworder/vieworder.component';
import { DeleteorderComponent } from '../popup/deleteorder/deleteorder.component';
import { EditorderComponent } from '../popup/editorder/editorder.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewProductComponent } from '../popup/view-product/view-product.component';
import { AddProductPopComponent } from '../popup/add-product-pop/add-product-pop.component';

@Component({
  selector: 'app-product-extract',
  templateUrl: './product-extract.component.html',
  styleUrls: ['./product-extract.component.scss']
})
export class ProductExtractComponent {
  @ViewChild('printableContent', { static: false }) printableContent!: ElementRef;
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
  date= new Date
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
            this.products = this.prod
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
            this.products = this.prod
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

  filterOrdersByCriteria(orderId: string): void {
    this.products = this.prod.filter((order: any) => {
      return (
        (!orderId || order.name.includes(orderId))
      );
    });
    console.log(this.filteredOrders);
  }
  clearFilters(){
    this.orderId = ""
    this.products = this.prod
    console.log(this.filteredOrders);
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
            this.products=""
            setTimeout(() => {
              this.getProdsAfterDelete()
              this.spinner.hide();
            }, 100);


          }
        },
        (reason) => {
          console.log('Modal dismissed with reason:', reason);
        }
        )
  }
  extract(orderId: string, name: string, email: string){
    console.log("print reciepts")
    setTimeout(() => {
      let printContents = this.printableContent.nativeElement.innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
    }, 100);

}
}
