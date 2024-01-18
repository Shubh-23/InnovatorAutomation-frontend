import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminmoduleRoutingModule } from '../adminmodule/adminmodule-routing/adminmodule-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NavbarComponent,SidebarComponent
  ],
  imports: [
    CommonModule,AdminmoduleRoutingModule,NgbDropdownModule
  ],
  exports:[SidebarComponent,NavbarComponent]
})
export class SharedModule { }
