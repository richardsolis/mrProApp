import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { DatePipe } from "@angular/common";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { PerfilPage } from "../pages/perfil/perfil";
import { ListaPage } from "../pages/lista/lista";
import { ChatPage } from "../pages/chat/chat";
import { InterCardPage } from "../pages/inter-card/inter-card";
import { ChatInterPage } from "../pages/chat-inter/chat-inter";

import { allService } from "../service/all.service";
import { SessionService } from "../service/session.service";

import { HttpModule } from "@angular/http";

import { HttpClientModule } from "@angular/common/http";
import { Push, PushObject, PushOptions } from "@ionic-native/push";

@NgModule({
  declarations: [MyApp, HomePage, LoginPage, PerfilPage, ListaPage, ChatPage, InterCardPage, ChatInterPage],
  imports: [ 
  HttpModule, HttpClientModule, BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, LoginPage, PerfilPage, ListaPage, ChatPage, InterCardPage, ChatInterPage],
  providers: [DatePipe, Push, StatusBar, SplashScreen, { provide: ErrorHandler, useClass: IonicErrorHandler }, allService, SessionService]
})
export class AppModule {}
