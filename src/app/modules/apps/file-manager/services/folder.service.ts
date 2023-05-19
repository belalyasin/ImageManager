import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Folder } from '../models/folder.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private http: HttpClient) {}
  apiLink: string = 'http://localhost:3000/api/v1/folder';

  getAll(): Observable<any> {
    let params = new HttpParams();
    // params = params.append('page', page);
    // params = params.append('limit', limit);
    return this.http.get<any>(`${this.apiLink}/`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
  getById(id: string): Observable<Folder> {
    return this.http
      .get<Folder>(`${this.apiLink}/${id}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'body',
      })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }
  add(folder: any): Observable<any> {
    return this.http.post<any>(`${this.apiLink}/`, folder, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }),
      observe: 'body',
    });
  }
  update(id: number, folder: Folder) {
    return this.http.patch<Folder>(`${this.apiLink}/${id}`, folder, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization: `Bearer ${localStorage.getItem('token')}`}),
      observe: 'body',
    });
  }
  delete(id: number): Observable<any> {
    return this.http.delete<Folder>(`${this.apiLink}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
  move(id: number ,folder:any): Observable<any> {
    return this.http.patch<Folder>(`${this.apiLink}/${id}/move`, folder,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
}
