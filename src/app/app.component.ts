import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chipsetAdmin';
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private modalService : NgbModal,
  ) {
  }
  ngOnInit(): void {
    // this.spinner.show();
  }
}
