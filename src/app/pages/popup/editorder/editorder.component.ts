import { Component, Input } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.scss']
})
export class EditorderComponent {
  @Input() data: any;
  model: string="";
  specs:any={};
  pcmodel: string="";
  price:any=0.00;
  discount:any=0;
  Total:any=0.00;
  amount: any = 1;
  name:any="";
  mobile:any="";
  email:any="";
  post:any="";
  add1:any="";
  add2:any="";
  add3:any="";
  unitprice:any="";
  units:any="";
  payMethod:any=1;
  billingAmount:any=""
  discountp:any=0
  date: any  ;
  constructor(
    private titleService: Title,
    private router: Router,
    private landingservice : LoginService,
    private spinner: NgxSpinnerService,
    private _sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {

    console.log("orderDetails:", this.data)

    this.pcmodel = this.data.model;
    this.name=this.data.name
    this.mobile=this.data.mobile
    this.email=this.data.email
    this.post=this.data.post
    this.add1=this.data.add1
    this.add2=this.data.add2
    this.add3=this.data.add3
    this.unitprice=this.data.unitprice
    this.units=this.data.units
    this.billingAmount=this.data.billingAmount

  }
  calculatePrice(unitprice:any,units:any){
    this.billingAmount = unitprice*units
  }
  adddiscount(amount:any){
    this.discount = (this.billingAmount/100)*amount
    this.billingAmount = this.billingAmount - this.discount
  }

}
