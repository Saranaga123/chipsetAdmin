import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService : NgbModal,
  ) {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 1000);
  }
  ngOnInit(): void {

  }
}
