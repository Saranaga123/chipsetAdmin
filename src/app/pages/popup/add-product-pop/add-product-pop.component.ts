import { Component, Input } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-product-pop',
  templateUrl: './add-product-pop.component.html',
  styleUrls: ['./add-product-pop.component.scss']
})
export class AddProductPopComponent {
  model: string="";
  Description: string="";
  Processor: string=""
  Price: number=0;
  Icon: string="";
  ope: string="";
  Graphics: string="";
  Display: string="";
  Memory: string="";
  Storage: string="";
  Case: string="";
  Keyboard: string="";
  Camera: string="";
  Touchpad: string="";
  Weight: string="";
  Wireless: string="";
  Battery: string="";
  Power: string="";
  blife: string="";
  Regulatory: string="";
  image: string="";
  image1: string="";
  image2: string="";
  image3: string="";
  globalOBJ:any;
  audio:string=""
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
  imageUrl: string | ArrayBuffer | null = null;
  imageUrl2: string | ArrayBuffer | null = null;
  imageUrl3: string | ArrayBuffer | null = null;
  imageUrl4: string | ArrayBuffer | null = null;
  submited:boolean=false
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
  onFileSelected2(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl2 = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
  onFileSelected3(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl3 = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
  onFileSelected4(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl4 = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
  ngOnInit(): void {



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
  submit(){
    this.submited=true
    let obj = {
      model:this.model,
      Description:this.Description,
      Processor:this.Processor,
      Price:this.Price,
      Icon: this.imageUrl,
      ope: this.ope,
      Graphics: this.Graphics,
      Display: this.Display,
      Memory: this.Memory,
      Storage: this.Storage,
      Case: this.Case,
      Keyboard: this.Keyboard,
      Camera: this.Camera,
      Touchpad: this.Touchpad,
      Weight: this.Weight,
      Wireless: this.Wireless,
      Battery: this.Battery,
      Power: this.Power,
      blife: this.blife,
      Regulatory: this.Regulatory,
      image: this.imageUrl,
      image1: this.imageUrl2,
      image2: this.imageUrl3,
      image3: this.imageUrl4,
      audio: this.audio
    }
    this.validate(obj);

  }
  validate(obj: any) {
    let valid = true
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
          valid = false
          console.log(`${key} is empty`);
        }
      }
    }
    if(valid){
      this.globalOBJ= obj
      this.upload()
    }else{
      console.log("upload Failed")
    }

  }
  upload(){
    console.log("uploading",this.globalOBJ)
    this.service1()
  }
  service1() {
    // Construct the product object
    let obj = {
      id:"",
      name: this.globalOBJ.model,
      userid: "1",
      buyerid: "1",
      price: this.globalOBJ.Price,
      description: this.globalOBJ.Description,
      available: "10",
      category: "test",
      status: "Active",
      image: this.globalOBJ.Icon,
    };

    // Call the service method to create the product
    this.landingservice.createprod(obj).subscribe(
      response => {
        console.log(response);
        this.service2();
      },
      error => {
        console.error('Error creating product:', error);
      }
    );
  }
  service2(){
    let obj = {
      id:"",
      name: this.globalOBJ.model,
      price: this.globalOBJ.Price,
      Processor:this.globalOBJ.Processor,
      OperatingSystem :this.globalOBJ.ope,
      GraphicsCard:this.globalOBJ.Graphics,
      Display:this.globalOBJ.Display,
      Memory :this.globalOBJ.Memory,
      Storage:this.globalOBJ.Storage,
      Case:this.globalOBJ.Case,
      Keyboard:this.globalOBJ.Keyboard,
      Camera:this.globalOBJ.Camera,
      AudioAndSpeakers :this.globalOBJ.audio,
      Touchpad:this.globalOBJ.Touchpad,
      Wireless :this.globalOBJ.Wireless,
      PrimaryBattery:this.globalOBJ.Battery,
      BatteryLife :this.globalOBJ.blife,
      Power : this.globalOBJ.Power,
      Regulatory :this.globalOBJ.Regulatory,
      Weight:this.globalOBJ.Weight,
      image:this.globalOBJ.image1,
      image2:this.globalOBJ.image2,
      image3:this.globalOBJ.image3

    }
    console.log("obj2 = ",obj)
    this.landingservice.createprodspec(obj).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error creating product:', error);
      }
    );
  }
}
