import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //current user: which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  //generate token
  public generateToken(logindata:any){
    return this.http.post(`${baseUrl}/generate-token`,logindata);
  }
  //Login User function :set token on localstorage
  public loginUser(token:string){
    localStorage.setItem("token",token);
    return true;
  }
  //isLogin: User is login or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }
  //Logout: Remove token from localstorage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  //get token
  public getToken(){
    return localStorage.getItem("token");
  }
  //set user details
  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }
  //get user details
  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr !=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }
  //get user Role
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }

}
