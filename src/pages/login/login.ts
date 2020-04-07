import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { HomePage } from "../home/home";
import { allService } from "../../service/all.service";
import { SessionService } from "../../service/session.service";
import { AlertController } from "ionic-angular";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  public user: any = {
    username: "",
    password: "",
    grant_type: "password",
    client_id: 2,
    client_secret: "tgOahYqzhbWMrjsDKPGsP2qSGU22dVxxNcfrt0lr"
  };
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: allService,
    public session: SessionService
  ) {}

  ionViewDidLoad() {
    // this.service.addUser()
    // this.service.login(this.user);
    console.log("ionViewDidLoad LoginPage");
  }

  goHome() {
    const loader = this.loadingCtrl.create({
      content: "Ingresando..."
    });
    loader.present();
    this.service.login(this.user).subscribe(
      (response: any) => {
        console.log(response);
        this.session.setObject(
          "token",
          JSON.parse(response._body).token_type +
            " " +
            JSON.parse(response._body).access_token
        );
        this.service.user().subscribe((responses: any) => {
          this.session.setObject("user", JSON.parse(responses._body));
          loader.dismiss();
          console.log(response);
        });
        this.navCtrl.setRoot(HomePage);
        this.session.setObject("list-provider", JSON.parse(response._body));
      },
      err => {
        const confirm = this.alertCtrl.create({
          title: "Error",
          message: "Contraseña o Usuario incorrecto",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                console.log("Agree clicked");
              }
            }
          ]
        });
        loader.dismiss();
        confirm.present();

        console.log(err);
      }
    );
  }
}
