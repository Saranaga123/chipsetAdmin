import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username:any=""
  password:any=""
  invalid:boolean=false
  constructor(
    private router: Router,
    private landingservice : LoginService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private modalService : NgbModal,
  ) {
  }
  ngOnInit(): void {

  }
login(){
  this.submituserdata()
  // this.spinner.show()
  // setTimeout(() => {
  //   this.spinner.hide()

  //   // this.router.navigate(['/Space']);
  //   console.log(this.username,this.password)
  // }, 1000);

}
  submituserdata(){
    this.spinner.show();
    let obj = {
      id: this.username,
      pw: this.password
    };

    console.log("Data", obj);
    if (obj.id == "" || obj.pw == "") {
      this.invalid = true;
      this.spinner.hide();
    } else {
      this.landingservice.login(obj).subscribe(
        (response) => {
          this.spinner.hide();
          console.log("good response", response);

          // Store response in sessionStorage
          sessionStorage.setItem("userdata", JSON.stringify(response));

          // Directly access the role property
          const role = response.role;
          if (role == "ADMIN"){
            this.invalid = false;
            this.router.navigate(['/Space']);
          }else{
            this.invalid = true;
          }
          console.log("User role:", role);


        },
        (error) => {
          this.spinner.hide();
          console.log("bad response", error.error.text);
          this.invalid = true;
        }
      );
    }
  }

}
