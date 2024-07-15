import { Component, Input } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-deleteorder',
  templateUrl: './deleteorder.component.html',
  styleUrls: ['./deleteorder.component.scss']
})
export class DeleteorderComponent {
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
    this.activeModal.close('confirm');
  }

  dismiss() {
    this.activeModal.dismiss('cancel');
  }
  proceed(){
    console.log("proceed")
    this.spinner.show();
    this.landingservice.deleteOrder(this.data.id).subscribe(
      (response) => {
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();

      }
    );
  }
}
