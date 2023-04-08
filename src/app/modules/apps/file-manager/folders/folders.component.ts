import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
})
export class FoldersComponent implements OnInit {
  isSelected: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.check()
  }
  check(){
    this.isSelected =  !this.isSelected
  }
}
