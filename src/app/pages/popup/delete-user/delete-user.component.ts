import { Component, Input } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  @Input() data: any;
  model: string="";
  specs:any={};
  confirmation:any=""
  err:boolean=false
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
  ngOnInit(): void {

    console.log("orderDetails:", this.data)


  }

  delete(){
    if(this.confirmation=="delete"||this.confirmation=="Delete"||this.confirmation=="DELETE"){
      this.confirmDelete()
    }else{
      this.err=true
    }
  }
  confirmDelete() {
    this.proceed()

  }

  dismiss() {
    this.activeModal.dismiss('cancel');
  }
  proceed(){
    console.log("proceed")
    this.spinner.show();
    this.landingservice.deleteUser(this.data.email).subscribe(
      (response) => {
        this.activeModal.close('confirm');
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
}
