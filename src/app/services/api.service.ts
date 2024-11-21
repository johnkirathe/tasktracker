import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  private readonly http = inject(HttpClient);

  constructor() {
  }

  get(url: string): Observable<T> {
    return this.http.get<T>(baseUrl + `/${url}`);
  };

  post(url: string, body: T): Observable<T> {
    return this.http.post<T>(baseUrl + `/${url}`, body);
  };

  put(url: string, body: T): Observable<T> {
    return this.http.put<T>(baseUrl + `/${url}`, body);
  };

  delete(url: string): Observable<T> {
    return this.http.delete<T>(baseUrl + `/${url}`);
  };
}
