import { Component, Input } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.scss']
})
export class VieworderComponent {
  @Input() data: any;
  model: string="";
  specs:any={};
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
    this.getProd(this.data.model)

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

}
