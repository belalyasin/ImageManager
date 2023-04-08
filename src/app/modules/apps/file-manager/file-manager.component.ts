import { Component, OnInit, Renderer2, ElementRef  } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import DataTable from 'datatables.net-dt';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  isSelected:boolean=false;

  constructor() { }

  ngAfterViewInit(): void {
    // let table = new DataTable('#kt_file_manager_list');
    // $('#kt_file_manager_list').dataTable({
    //   order: [[0, 'asc']],
    //   paging: true,
    //   searching: true,
    //   info: true,
    // });
  }

  ngOnInit(): void {
  }

}
