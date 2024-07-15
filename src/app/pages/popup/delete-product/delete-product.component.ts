import { Component, Input } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {
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
    this.getProd(this.data.name)

  }
  getProd(model:any){
    this.spinner.show()
    const observer = {
      next: (data: any) => {
        this.specs=data[0]
        this.specs.image=this._sanitizer.bypassSecurityTrustResourceUrl( this.specs.image)
        this.specs.image2=this._sanitizer.bypassSecurityTrustResourceUrl( this.specs.image2)
        this.specs.image3=this._sanitizer.bypassSecurityTrustResourceUrl( this.specs.image3)
        this.specs.selectedImage="image"
        console.log(this.specs)
        this.spinner.hide()
      },
      error: (error: any) => {
        console.error('Error retrieving transaction:', error);
      },
    };

    this.landingservice.getprod(model).subscribe(observer);
  }
  selectImage(image:string){
    this.specs.selectedImage=image
    console.log(this.specs)
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
    this.landingservice.deleteProd(this.data.name).subscribe(
      (response) => {
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();

      }
    );
  }
}
