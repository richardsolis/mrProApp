import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { SessionService } from "../../service/session.service";
import { LoginPage } from "../login/login";
import { DatePipe } from "@angular/common";
import { allService } from "../../service/all.service";

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-perfil",
  templateUrl: "perfil.html"
})
export class PerfilPage {
  public perfil = this.session.getObject("user").data.provider;
  d = new Date();
  n = this.d.getFullYear();
  perfil1 = true;
  finalizado = this.session.getObject("finalizado").length;
  constructor(public loadingCtrl: LoadingController, public service: allService, private datePipe: DatePipe, public navCtrl: NavController, public navParams: NavParams, public session: SessionService) {}
  ionViewDidEnter() {
    const loader = this.loadingCtrl.create({
      content: "Cargando perfil..."
    });
    loader.present();
    this.service.user().subscribe((responses: any) => {
      this.session.setObject("user", JSON.parse(responses._body));
      this.perfil = this.session.getObject("user").data.provider;
      loader.dismiss();
    });
  }
  ionViewDidLoad() {
    this.n = this.n - parseInt(this.datePipe.transform(this.perfil.experience, "yyyy"));
    console.log(this.perfil, "ionViewDidLoad PerfilPage");
  }
  logAuth() {
    console.log("asdasd");
    this.session.destroy("item");
    this.session.destroy("token");
    this.session.destroy("list-provider");
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }
}
