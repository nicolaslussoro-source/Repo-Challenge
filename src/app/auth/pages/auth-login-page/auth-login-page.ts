import { AuthService } from './../../service/auth-service';
import { FormUtils } from './../../../utils/FormUtils';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-auth-login-page',
  imports: [
    ReactiveFormsModule, 
    RouterLink 
  ],
  templateUrl: './auth-login-page.html',
})
export class AuthLoginPage {

  authService = inject(AuthService);
  router = inject(Router);

  fb: FormBuilder = new FormBuilder();
  formUtils = FormUtils;

  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);
  
  
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)/)]],
  });

  

  

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.hasError.set(true);

      return;
    }
    
    const credentials = this.loginForm.value;
    this.isPosting.set(true);

    this.authService.login(credentials).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/auth/dashboard']);
      }

      this.hasError.set(true);
    });
  }
}

export default AuthLoginPage;