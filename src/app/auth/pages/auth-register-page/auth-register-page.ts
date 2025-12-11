import { FormUtils } from './../../../utils/FormUtils';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-register-page',
  imports: [ReactiveFormsModule,],
  templateUrl: './auth-register-page.html',

})
export class AuthRegisterPage {

  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router)


  formUtils = FormUtils;
  submitMessage: string = '';
  submitError: string = '';

  hasError = signal<boolean>(false);


  registerForm = this.fb.group({
    name: ['', [Validators.required, FormUtils.fullNameValidator()]],
    email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)], [this.authService.checkEmailValidator()]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)/)]],
    passwordConfirm: ['', [Validators.required]]
  },
  {
    validators: this.passwordMatchValidator
  });

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordConfirm = formGroup.get('passwordConfirm')?.value;
    if (password !== passwordConfirm) {
      formGroup.get('passwordConfirm')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('passwordConfirm')?.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    this.submitMessage = '';
    this.submitError = '';

    if (this.registerForm.invalid) {
      FormUtils.markAllAsTouched(this.registerForm);
      this.submitError = 'Por favor completa todos los campos correctamente antes de enviar.';
      return;
    }

    const formData = this.registerForm.value;
    this.authService.register(formData).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/auth/dashboard']);
      }

      this.hasError.set(true);
    });


    
  }

  markAllAsTouched() {
    FormUtils.markAllAsTouched(this.registerForm);
  }
 }

export default AuthRegisterPage;

