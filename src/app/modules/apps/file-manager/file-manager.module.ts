import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { FileManagerComponent } from './file-manager.component';
import { FoldersComponent } from './folders/folders.component';
import { FilesComponent } from './files/files.component';


@NgModule({
  declarations: [
    FileManagerComponent,
    FoldersComponent,
    FilesComponent
  ],
  imports: [
    CommonModule,
    FileManagerRoutingModule
  ]
})
export class FileManagerModule { }
