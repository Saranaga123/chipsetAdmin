import { Component, Input } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-password-update-user',
  templateUrl: './password-update-user.component.html',
  styleUrls: ['./password-update-user.component.scss']
})
export class PasswordUpdateUserComponent {
  @Input() data: any;
  constructor(
    private titleService: Title,
    private router: Router,
    private landingservice : LoginService,
    private spinner: NgxSpinnerService,
    private _sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal
  ) {
  }
password:any=""
update(){
this.proceed()
}
proceed(){
  console.log("proceed")
  this.spinner.show();
  this.landingservice.resetPassword(this.data.id,this.password).subscribe(
    (response) => {
      this.activeModal.close('confirm');
    },
    (error) => {
      this.spinner.hide();
    }
  );
}
}
