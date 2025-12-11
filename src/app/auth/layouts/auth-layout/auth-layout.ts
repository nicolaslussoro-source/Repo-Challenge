import { AuthService } from './../../service/auth-service';
import { Component, inject } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-auth-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {

  authService = inject(AuthService);

  items = [
    { label: 'Login', icon: 'log-in', route: '/auth/login' },
    { label: 'Register', icon: 'user-plus', route: '/auth/register' },
    { label: 'Dashboard', icon: 'user', route: '/auth/dashboard' },
  ];
}

export default AuthLayout;