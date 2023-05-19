import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../account/models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  user: User = {
    name: '',
    email: '',
    password: '',
    token: '',
    avatar: '',
    googleId: '',
  };
  constructor(private http: HttpClient) {}
  apiLink: string = 'http://localhost:3000/api/v1/user';

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiLink}/login`,
      { email, password },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'body',
      }
    );
  }
  register(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiLink}/signup`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'body',
    });
  }
  logout(): Observable<User> {
    return this.http.post<User>(
      `${this.apiLink}/logout`,
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      }
    );
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http
      .get<any>(`${this.apiLink}/`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      })
      .pipe(catchError(this.handleError<any>('getCurrentUser')));
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
