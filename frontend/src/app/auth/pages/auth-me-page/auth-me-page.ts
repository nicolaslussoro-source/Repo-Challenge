import { ProfileAvatar } from './../../components/profile-avatar/profile-avatar';
import { AuthService } from './../../service/auth-service';
import { DatePipe } from '@angular/common';
import { User } from './../../../shared/interfaces/User.interface';

import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-auth-me-page',
  imports: [DatePipe, ProfileAvatar], 
  templateUrl: './auth-me-page.html',
})
export class AuthMePage {

  
  authService = inject(AuthService)

  router = inject(Router);
 
  redirectToMetrics(): void {

     this.router.navigate(['/metrics']);
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }

 
}

export default AuthMePage;