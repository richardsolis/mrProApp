import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { PerfilPage } from "../perfil/perfil";
import { ListaPage } from "../lista/lista";
import { ChatPage } from "../chat/chat";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public login = LoginPage;
  public perfil = PerfilPage;
  public lista = ListaPage;
  public chat = ChatPage;

  constructor(public navCtrl: NavController) {}
}
