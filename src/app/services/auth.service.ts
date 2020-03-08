import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import localeES from "@angular/common/locales/es";
import { formatDate } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }

  obtainAccessToken(username,password): Observable<any>{
        let params = new URLSearchParams();
        params.append('username',username);
        params.append('password',password);    
        params.append('grant_type','password');
        params.append('client_id','rest-client');
        let headers = 
          new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Basic '+btoa("rest-client:rest-secret")});
        let options = { headers: headers};
         
        return this.http.post('http://localhost:8080/oauth/token', 
          params.toString(), options)
          .pipe(map(res =>{
              if(res['access_token'] !== ''){
                localStorage.setItem('access_token',res['access_token']);
                localStorage.setItem('refresh_token',res['refresh_token']);
                this.router.navigate(['/users']);
              }
              
              return res;

              
    }))
          
     
  }

  /*saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token['expires_in']);
  
    const format = 'dd/MM/yyyy';
    const myDate = '2019-06-29';
    const locale = 'en-US';
    const formattedDate = formatDate(expireDate, format, locale);

    console.log(formattedDate);
    
    setTimeout(function(){localStorage.removeItem("access_token");}, expireDate);

    //Cookie.set("access_token", token.access_token, expireDate);
    this.router.navigate(['/users']);
  }*/
}
