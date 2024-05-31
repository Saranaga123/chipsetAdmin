import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TasksBoardComponent } from './pages/tasks-board/tasks-board.component';
import { HolderComponent } from './pages/holder/holder.component';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { OrdersExtractComponent } from './pages/orders-extract/orders-extract.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ProductExtractComponent } from './pages/product-extract/product-extract.component';
import { UsersCreateComponent } from './pages/users-create/users-create.component';
import { UsersUpdateComponent } from './pages/users-update/users-update.component';
import { UsersExtractComponent } from './pages/users-extract/users-extract.component';
import { GenerateInvoiceComponent } from './pages/generate-invoice/generate-invoice.component';
import { GenerateCompanyInvoiceComponent } from './pages/generate-company-invoice/generate-company-invoice.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    TasksBoardComponent,
    HolderComponent,
    PendingOrdersComponent,
    NewOrderComponent,
    OrdersExtractComponent,
    AddProductComponent,
    EditProductComponent,
    ProductExtractComponent,
    UsersCreateComponent,
    UsersUpdateComponent,
    UsersExtractComponent,
    GenerateInvoiceComponent,
    GenerateCompanyInvoiceComponent,
    FiltersComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NgxSpinnerModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
