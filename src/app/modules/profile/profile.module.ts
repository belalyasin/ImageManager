import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { DocumentsComponent } from './documents/documents.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {
  CardsModule,
  DropdownMenusModule,
  WidgetsModule,
} from '../../_metronic/partials';

@NgModule({
  declarations: [
    DocumentsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    CardsModule,
  ],
  exports:[
    DocumentsComponent
  ]
})
export class ProfileModule {}
