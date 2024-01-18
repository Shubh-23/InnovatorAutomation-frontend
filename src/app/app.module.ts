import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { AdminmoduleModule } from './adminmodule/adminmodule.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './sharedmodule/shared.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DateFormatePipe } from './pipe/date-formate.pipe';
// import { DateFormatePipe } from './pipe/date-formate.pipe';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AuthModuleModule,AdminmoduleModule,HttpClientModule,ReactiveFormsModule,SharedModule, NgbModule,NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
