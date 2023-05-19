import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FolderService } from '../../apps/file-manager/services/folder.service';
import { Folder } from '../../apps/file-manager/models/folder.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
})
export class DocumentsComponent implements OnInit, OnDestroy {
  files : any[] =[]
  private unsubscribe: Subscription[] = [];
  total_pages: number;
  total: number;
  total_pagesAr: number[];
  limit: number = 4;
  page: number = 1;
  isLodding: boolean = false;
  constructor(private folder: FolderService) {}
  ngOnInit(): void {
    this.getFile();
    // console.log(this.files);

  }
  getFile(){
    // this.isLodding = true;
    this.folder.getAll().subscribe(
      (res) => {
        console.log('res ' + JSON.stringify(res.data));
        this.files = res.data.folders;
        // console.log('files' + this.files[0].name);
        // this.page = res.page;
        // this.total_pages = res.total_pages;
        // this.total = res.total;
        // this.isLodding = false;
      },
      (error) => {
        this.isLodding = false;
      }
    )
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
