import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SessionService } from "../../service/session.service";
import { AlertController, LoadingController } from "ionic-angular";
import { allService } from "../../service/all.service";
import { Events } from "ionic-angular";

/**
 * Generated class for the InterCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-inter-card",
  templateUrl: "inter-card.html"
})
export class InterCardPage {
  public data = this.session.getObject("item");
  public distritos = this.session.getObject("distritos");
  public distritoDetected = "";
  constructor(public loadingCtrl: LoadingController, public service: allService, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public session: SessionService, public events: Events) {}

  ionViewDidLoad() {
    for (let i = 0; i < this.distritos.length; i++) {
      if (this.distritos[i].id == this.data.district_id) {
        this.distritoDetected = this.distritos[i].name;
      }
    }
    // this.data = this.session.getObject("item");
    console.log(this.distritos, "ionViewDidLoad InterCardPage");
  }

  goBack() {
    this.navCtrl.pop();
  }

  showConfirm(option) {
    var text;
    var value;
    if (option) {
      text = "¿Estas seguro de ACEPTAR la petición?";
      value = "4";
    } else {
      text = "¿Estas seguro de RECHAZAR la petición?";
      value = "3";
    }
    const confirm = this.alertCtrl.create({
      title: "Confirmación",
      message: text,
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Si",
          handler: () => {
            const loader = this.loadingCtrl.create({
              content: "Cargando..."
            });
            loader.present();
            this.service.updateStatus(value, this.data.id).subscribe(response => {
              this.service.getBudget().subscribe((response: any) => {
                console.log(response);
                this.session.setObject("list-provider", JSON.parse(response._body));
                this.navCtrl.pop();
                this.events.publish("user:login");
                loader.dismiss();
              });
            });
            console.log("Agree clicked");
          }
        }
      ]
    });
    confirm.present();
  }
}
