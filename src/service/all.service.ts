import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { SessionService } from "./session.service";

@Injectable()
export class allService {
  constructor(public httpC: HttpClient, private http: Http, public session: SessionService) {}
  apiUrl = "http://admin-mrpro.mrpro.pe/api";
  // private itemsCollection: AngularFirestoreCollection<Chat>;
  // public currentChat: Chat;


  // crearChat(title: string){
  //   this.itemsCollection = this.afs.collection<Chat>('chats');
  //   const id = this.afs.createId();
  //   let newchat: Chat = {
  //     id,
  //     titulo: title,
  //     fecha: new Date().getTime(),
  //     mensajes: []
  //   }
  //   this.itemsCollection.doc(id).set( newchat ).then( ()=>{
  //     this.currentChat = newchat; 
  //     console.log("crearChat",this.currentChat);
  //   }).catch( (err)=>console.error('Error al enviar',  err ) );
  //   return newchat;                      
  // }

  login(data) {
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.post(this.apiUrl + "/oauth/token", JSON.stringify(data), { headers: headers });
  }

  getBudget() {
    const headers = new Headers({
      Authorization: this.session.getObject("token")
    });
    return this.http.post(this.apiUrl + "/client/get/budget", { type: "provider" }, { headers: headers });
  }

  user() {
    const headers = new Headers({
      Authorization: this.session.getObject("token")
    });
    return this.http.post(this.apiUrl + "/oauth/current/user", null, { headers: headers });
  }

  SetToken(user_idP, phone_typeP, phone_tokenP) {
    let obj = {
      user_id: user_idP,
      phone_type: phone_typeP,
      phone_token: phone_tokenP
    };

    const body = new HttpParams({
      fromObject: obj
    });
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.httpC.post(this.apiUrl + "/oauth/user/phone/update", body, { headers: headers });
  }
  guestGetDistricts() {
    return this.http.get(this.apiUrl + "/guest/districts");
  }

  updateStatus(option: string, budgetID: string) {
    let obj = {
      budget_id: budgetID,
      status_id: option
    };

    const body = new HttpParams({
      fromObject: obj
    });
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: this.session.getObject("token")
    });
    return this.httpC.post(this.apiUrl + "/client/set/budget/status", body, { headers: headers });
  }
}
