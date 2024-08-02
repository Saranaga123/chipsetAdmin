import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  @Input() data: any;
  name:any=""
  role:any=""
  email:any=""
  nic:any=""
  occupation:any=""
  bod:any=""
  gender:any=""
  vname:boolean=true
  vrole:boolean=true
  vemail:boolean=true
  vnic:boolean=true
  voccupation:boolean=true
  vbod:boolean=true
  vgender:boolean=true
  validemail:boolean=true
  Validform:boolean=true
  constructor(
    private router: Router,
    private landingservice : LoginService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private activeModal: NgbActiveModal,

  ) {
  }
  ngOnInit(): void {
    this.getUserData()

  }
  getUserData(){
      this.name=this.data.name,
      this.role=this.data.role,
      this.email=this.data.email,
      this.nic=this.data.nic,
      this.occupation=this.data.occupation,
      this.bod=this.data.bod,
      this.gender=this.data.gender
  }
  submitform(){
    this.Validate()
  }
  Validate(){
    this.validateEmail()
    if(this.name==""){
      this.vname = false
    }else{
      this.vname = true
    }

    if(this.email==""){
      this.vemail = false
    }else{
      this.vemail = true
    }
    if(this.role==""){
      this.vrole = false
    }else{
      this.vrole = true
    }

    if(this.nic==""){
      this.vnic = false
    }else{
      this.vnic = true
    }

    if(this.occupation==""){
      this.voccupation = false
    }else{
      this.voccupation = true
    }
    if(this.bod==""){
      this.vbod = false
    }else{
      this.vbod = true
    }

    if(this.gender==""){
      this.vgender = false
    }else{
      this.vgender = true
    }


    if(this.vgender&& this.vbod&&this.voccupation&&this.vnic&&this.vemail&&this.vname&&this.vrole&&this.validemail){
      this.Validform=true
      this.createobj()
    }else{
      this.Validform=false
    }
  }
  validateEmail(){
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      this.validemail = emailRegex.test(this.email);
  }
  createobj(){
    this.spinner.show();
    let userdata = {
      id:this.data.id,
      name:this.name,
      role:this.role,
      email:this.email,
      nic:this.nic,
      occupation: this.occupation,
      bod: this.bod,
      gender:this.gender,
      image:"",
      status:"active"
    }
    this.landingservice.updateUserDetails(userdata).subscribe(
      (response) => {
        this.spinner.hide();
        if(response){
          this.activeModal.close('confirm');
        }
      },
      (error) => {
        this.spinner.hide();
        console.log("responce bad", error.error.text);

      }
    );
  }
}
