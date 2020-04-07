import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { InterCardPage } from "../inter-card/inter-card";
import { App } from "ionic-angular";
import { SessionService } from "../../service/session.service";
import { allService } from "../../service/all.service";
import { Events } from "ionic-angular";
/**
 * Generated class for the ListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-lista",
  templateUrl: "lista.html"
})
export class ListaPage {
  constructor(public events: Events, public loadingCtrl: LoadingController, public service: allService, public navCtrl: NavController, public navParams: NavParams, public app: App, public session: SessionService) {
    events.subscribe("user:login", () => {
      this.ionViewDidEnter();
    });
  }
  public list;
  public token;
  public pendientes = [];
  public proceso = [];
  public finalizados = [];
  filter = "pendientes";

  ionViewDidEnter() {
    if (this.session.getObject("idtoken")) {
      this.token = this.session.getObject("idtoken");
      this.service.SetToken(this.session.getObject("user").data.provider.user_id, 0, this.token).subscribe(response => {
        console.log(response);
      });
    }

    console.log("dasdasd");
    const loader = this.loadingCtrl.create({
      content: "Cargando clientes..."
    });
    loader.present();
    this.pendientes = [];
    this.proceso = [];
    this.finalizados = [];
    this.service.getBudget().subscribe((response: any) => {
      console.log(response);
      this.list = JSON.parse(response._body).data;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].status_service_id == 4) {
          this.proceso.push(this.list[i]);
        }
        if (this.list[i].status_service_id == 1) {
          this.pendientes.push(this.list[i]);
        }

        if (this.list[i].status_service_id == 6) {
          this.finalizados.push(this.list[i]);
        }
      }
      console.log(this.proceso, this.pendientes, this.finalizados);
      console.log(this.list);
      this.session.setObject("list-provider", JSON.parse(response._body));
      this.session.setObject("finalizado", this.finalizados);
      loader.dismiss();
    });
    console.log("ionViewDidLoad ListaPage");
  }

  goPage(list) {
    this.session.setObject("item", list);
    console.log(list);
    this.navCtrl.parent.parent.push(InterCardPage);
  }
}
