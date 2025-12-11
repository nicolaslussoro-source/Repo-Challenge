import { User } from './../../shared/interfaces/User.interface';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserResponse } from '../../shared/interfaces/UserResponse.interface';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { EmailCheckResponse } from '../../shared/interfaces/EmailCheckResponse.interface';


function mapUserData(data: UserResponse): User {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    created_at: data.created_at,
    last_login: data.last_login,
    login_count: data.login_count,
  };
}

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  checkStatusResourse = rxResource({
    stream: () => this.checkUser(),

  })
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('auth_token'));

  authStatus = computed<AuthStatus>(() => {
    if ( this._authStatus() === 'checking' ) return 'checking';
    if ( this._user()) return 'authenticated';
    return 'not-authenticated';
  });

  user = computed(() => {
    return this._user();
  });

  token = computed(() => {
   return this._token();
  });

  register (formData : { name: string, email: string, password: string}): Observable< boolean >{

    return this.http.post<UserResponse>(`${ environment.BACK_URL }/auth/register`, formData)
      .pipe(
        tap( resp => { console.log(resp)
          this.handleAuthSuccess(resp)}),
        map(() => true),
        catchError((error: any) => this.handleAuthError(error))
      );

  }

  login (formData: { email: string; password: string }): Observable< boolean > {
    return this.http.post<UserResponse>(`${ environment.BACK_URL }/auth/login`, formData)
      .pipe(
        tap(resp => {this.handleAuthSuccess(resp)
        }),
        map(() => true),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  logout() { 
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated')

    localStorage.removeItem('auth_token')
  }
       

  checkUser(): Observable<boolean> {

    const token = localStorage.getItem('auth_token');
    if ( !token ) {
      this.logout()
      return of(false);
    }

    return this.http.get<UserResponse>(`${ environment.BACK_URL }/auth/me`,
    ).pipe(
        tap(resp => {this.handleAuthSuccess(resp)
        }),
        map(() => true),
        catchError((error: any) => {this.handleAuthError(error)
          return of(false);
        })
      );
  }

  
  checkEmailValidator(): AsyncValidatorFn {
    
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      
      const email = control.value;
      
      if (!email) {
        return of(null);
      }

      const body = { email: email };

      return this.http.post<EmailCheckResponse>(`${environment.BACK_URL}/auth/email`, body)
        .pipe(
          map(response => {
            return response.isTaken ? { emailTaken: true } : null;
          }),
          
          catchError((err) => {
            console.error('Error del servidor durante la validación de email:', err);
            return of(null); 
          })
        );
    };
  }


  private handleAuthSuccess(resp : UserResponse ){
    localStorage.setItem('auth_token', resp.token);
    this._token.set(resp.token);
    this._user.set(mapUserData(resp))
    this._authStatus.set('authenticated');
    
  }

  private handleAuthError (error: any){
    this.logout();
    return of(false)
  }
}
