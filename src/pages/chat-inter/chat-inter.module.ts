import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatInterPage } from './chat-inter';

@NgModule({
  declarations: [
    ChatInterPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatInterPage),
  ],
})
export class ChatInterPageModule {}
