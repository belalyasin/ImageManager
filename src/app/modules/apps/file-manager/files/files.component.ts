import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy {
  isSelected: boolean = false;
  images:any[] = [];
  // private unsubscribe: Subscription[] = [];
  subscription: Subscription = new Subscription();
  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.getFiles();
    this.check();
  }
  getFiles(){
    this.subscription = this.fileService.getAll().subscribe(
      (res) => {
        console.log(res);
        this.images = res.data.images;
        console.log(this.images);

      },
      (error)=>{
        console.error(error);

      }
    )
  }
  check(){
    this.isSelected =  !this.isSelected
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
