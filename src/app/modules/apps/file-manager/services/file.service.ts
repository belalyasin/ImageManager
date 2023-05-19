import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {}

  apiLink: string = 'http://localhost:3000/api/v1/image';

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
}
