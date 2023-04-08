import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './file-manager.component';
import { FilesComponent } from './files/files.component';
import { FoldersComponent } from './folders/folders.component';

const routes: Routes = [
  {
    path: '',
    component: FileManagerComponent,
    children: [
      {
        path: 'folders',
        component: FoldersComponent,
      },
      {
        path: 'files',
        component: FilesComponent,
      },
      // {
      //   path: 'drawer-chat',
      //   component: DrawerChatComponent,
      // },

      { path: '', redirectTo: 'folders', pathMatch: 'full' },
      { path: '**', redirectTo: 'folders', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { }
