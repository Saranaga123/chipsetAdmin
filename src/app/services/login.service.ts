import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IuserLogin, userLogin } from './shared/models/userLogin';
import { IOrderUpload, Order } from './shared/models/order';
import { IProductUpload, Product } from './shared/models/product'
import { ORDER_UPLOAD_URL,GET_PROD_REQ,GET_PROD_LIST, LOGIN, ORDER_UPDATE_URL, GET_ORDERS, USER_CREATE, GET_ALL_ORDERS, ORDER_DELETE_URL, PRODUCT_CREATE_URL, PRODUCT_CREATE_URL2, PRODUCT_DELETE_URL, GET_PRODDATA, GET_PRODDATA_UPDATE, GET_PRODSPEC_UPDATE, USERS_GET, USER_DELETE, USER_PASSWORD_UPDATE, USER_UPDATE } from './shared/constants/urls';
import { IUserCreate, User } from './shared/models/user';
import { IProductspecUpload, ProductSpec } from './shared/models/productspec';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly serverURL: string;
  constructor(private http: HttpClient) {
    this.serverURL = this.determineServerURL();
  }
  private determineServerURL(): string {
      // return 'http://localhost:666';
      return 'https://sarabe.onrender.com'
  }

  getprodList( ):Observable<Product[]>{
    console.log(">>>>>>>>>>>>>1",GET_PROD_LIST)
    return this.http.get<Product[]>(GET_PROD_LIST)
  }
  getusersList( ):Observable<User[]>{
    console.log(">>>>>>>>>>>>>1",USERS_GET)
    return this.http.get<User[]>(USERS_GET)
  }
  getprod(id:any):Observable<Product[]>{
    const checkparam = id;
    console.log(">>>>>>>>>>>>>1",GET_PROD_REQ+checkparam)
    return this.http.get<Product[]>(GET_PROD_REQ+checkparam)
  }
  createprod(prodDetails:IProductUpload):Observable<Product>{
    return this.http.post<Product>(PRODUCT_CREATE_URL,prodDetails);
  }
  createprodspec(prodDetails:IProductspecUpload):Observable<ProductSpec>{
    return this.http.post<ProductSpec>(PRODUCT_CREATE_URL2,prodDetails);
  }
  createorder(orderDetails:IOrderUpload):Observable<Order>{
    return this.http.post<Order>(ORDER_UPLOAD_URL,orderDetails);
  }
  createuser(userdata:IUserCreate):Observable<User>{
    return this.http.post<User>(USER_CREATE,userdata);
  }
  getAllOrders():Observable<Product[]>{
    console.log(">>>>>>>>>>>>>1",GET_ALL_ORDERS)
    return this.http.get<Product[]>(GET_ALL_ORDERS)
  }

  getorders(id:any):Observable<Order[]>{
    const checkparam = id;
    console.log(">>>>>>>>>>>>>1",GET_ORDERS+checkparam)
    return this.http.get<Order[]>(GET_ORDERS+checkparam)
  }
  getProdData(id:any):Observable<Order[]>{
    const checkparam = id;
    console.log(">>>>>>>>>>>>>1",GET_PRODDATA+checkparam)
    return this.http.get<Order[]>(GET_PRODDATA+checkparam)
  }

  login(orderDetails:IuserLogin):Observable<User>{
    return this.http.post<User>(LOGIN,orderDetails);
  }
  updateOrder(id: any, orderDetails: IOrderUpload): Observable<Order[]> {
    const checkparam = id;
    console.log(">>>>>>>>>>>>>1", ORDER_UPDATE_URL + checkparam, orderDetails);

    // Use HTTP PUT and send orderDetails in the request body
    return this.http.post<Order[]>(ORDER_UPDATE_URL + checkparam, orderDetails);
  }
  resetPassword(id: string, password: string): Observable<any> {
    const url = USER_PASSWORD_UPDATE;
    const body = { id, password };
    return this.http.post(url, body);
  }
  updateUserDetails(user: any): Observable<any> {
    const url = USER_UPDATE;
    return this.http.post(url, user);
  }
  createOrUpdateProduct(id: any,product: any): Observable<any> {
    const checkparam = id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Product[]>(GET_PRODDATA_UPDATE + checkparam, product);
  }
  createOrUpdateProductSpec(id: any,product: any): Observable<any> {
    const checkparam = id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Product[]>(GET_PRODSPEC_UPDATE + checkparam, product);
  }

  deleteOrder(id: any): Observable<{ status: string }> {
    const deleteUrl = `${ORDER_DELETE_URL}${id}`;
    console.log("Deleting order with URL:", deleteUrl);

    // Use HTTP DELETE method to delete the order
    return this.http.delete<{ status: string }>(deleteUrl);
  }
  deleteProd(id: any): Observable<{ status: string }> {
    const deleteUrl = `${PRODUCT_DELETE_URL}${id}`;
    console.log("Deleting Product with URL:", deleteUrl);

    // Use HTTP DELETE method to delete the order
    return this.http.get<{ status: string }>(deleteUrl);
  }
  deleteUser(id: any): Observable<{ status: string }> {
    const deleteUrl = `${USER_DELETE}${id}`;
    console.log("Deleting Product with URL:", deleteUrl);

    // Use HTTP DELETE method to delete the order
    return this.http.get<{ status: string }>(deleteUrl);
  }
}
