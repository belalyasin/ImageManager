import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { FileManagerComponent } from './file-manager.component';
import { FoldersComponent } from './folders/folders.component';
import { FilesComponent } from './files/files.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FileManagerComponent,
    FoldersComponent,
    FilesComponent
  ],
  imports: [
    CommonModule,
    FileManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class FileManagerModule { }
