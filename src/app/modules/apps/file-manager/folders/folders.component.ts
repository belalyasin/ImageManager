import { Component, OnDestroy, OnInit } from '@angular/core';
import { Folder } from '../models/folder.model';
import { FolderService } from '../services/folder.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
})
export class FoldersComponent implements OnInit, OnDestroy {
  isSelected: boolean = false;
  click: boolean = false;
  folders: any[] = [];
  private unsubscribe: Subscription[] = [];
  subscription: Subscription = new Subscription();
  folderName = new FormGroup({
    name: new FormControl('',[Validators.required])
  });
  selectedFolderId: any;
  constructor(private folderService: FolderService) {}

  ngOnInit(): void {
    this.check();
    this.getFolders();
    this.onClick();
    // console.log(this.folders);
  }
  getFolders() {
    this.subscription = this.folderService.getAll().subscribe(
      (res) => {
        console.log(res);
        this.folders = res.data.folders;
        console.log(this.folders);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  check() {
    this.isSelected = !this.isSelected;
  }
  onClick() {
    this.click = !this.click;
    console.log(this.click);
  }
  onAdd({value,valid}:{value:any,valid:boolean}){
    // console.log(value.name);
    // let folder = value.name;
    this.folderService.add(value).toPromise().then(
      (res)=>{
        this.folders.push(res)
        // console.log(res);
        // console.log(this.folders);
        this.folderName.reset()
      }
    ).catch(
      (error)=>{
        console.error(error);
      }
    )
  }
  onDelete(id: any) {
    this.folderService.delete(id).toPromise().then(
      (res) => {
        console.log(res);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
  onMove(id:any){}
  selectedFolder(folder:any){
    this.selectedFolderId = folder;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
