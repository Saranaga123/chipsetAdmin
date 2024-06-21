import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IuserLogin, userLogin } from './shared/models/userLogin';
import { IOrderUpload, Order } from './shared/models/order';
import { Product } from './shared/models/product'
import { ORDER_UPLOAD_URL,GET_PROD_REQ,GET_PROD_LIST, LOGIN, ORDER_UPDATE_URL, GET_ORDERS, USER_CREATE, GET_ALL_ORDERS, ORDER_DELETE_URL } from './shared/constants/urls';
import { IUserCreate, User } from './shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly serverURL: string;
  constructor(private http: HttpClient) {
    this.serverURL = this.determineServerURL();
  }
  private determineServerURL(): string {
      return 'http://localhost:666';
      // return 'https://sarabe.onrender.com'
  }

  getprodList( ):Observable<Product[]>{
    console.log(">>>>>>>>>>>>>1",GET_PROD_LIST)
    return this.http.get<Product[]>(GET_PROD_LIST)
  }

  getprod(id:any):Observable<Product[]>{
    const checkparam = id;
    console.log(">>>>>>>>>>>>>1",GET_PROD_REQ+checkparam)
    return this.http.get<Product[]>(GET_PROD_REQ+checkparam)
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

  login(orderDetails:IuserLogin):Observable<User>{
    return this.http.post<User>(LOGIN,orderDetails);
  }
  updateOrder(id: any, orderDetails: IOrderUpload): Observable<Order[]> {
    const checkparam = id;
    console.log(">>>>>>>>>>>>>1", ORDER_UPDATE_URL + checkparam, orderDetails);

    // Use HTTP PUT and send orderDetails in the request body
    return this.http.post<Order[]>(ORDER_UPDATE_URL + checkparam, orderDetails);
  }
  deleteOrder(id: any): Observable<{ status: string }> {
    const deleteUrl = `${ORDER_DELETE_URL}${id}`;
    console.log("Deleting order with URL:", deleteUrl);

    // Use HTTP DELETE method to delete the order
    return this.http.delete<{ status: string }>(deleteUrl);
  }
}
