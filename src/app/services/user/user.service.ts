import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) { }

  getUser():Observable<any>{
    return this.http.get(this.apiUrl+'users')
    .pipe(map(res=>res));
  }
}
