import { FormGroup, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class FormUtils {

    static fullNameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;
            
            const parts: string[] = value.trim().split(/\s+/);
            if (parts.length < 2) {
                return { fullName: { message: 'Ingresa nombre y apellido (mínimo 2 partes)' } };
            }
            
            const allLetters = parts.every(part => /^[a-záéíóúñA-ZÁÉÍÓÚÑ]+$/.test(part));
            if (!allLetters) {
                return { fullName: { message: 'Solo se permiten letras en nombre y apellido' } };
            }
            
            const allMinLength = parts.every(part => part.length >= 2);
            if (!allMinLength) {
                return { fullName: { message: 'Cada parte debe tener mínimo 2 letras' } };
            }
            
            return null;
        };
    }

    static isFieldValid(formGroup: FormGroup, field: string): boolean {
        const control = formGroup.get(field);
        return control!.invalid && (control!.touched || control!.dirty);
    }

    static isFieldInvalid(formGroup: FormGroup, field: string): boolean {
        const control = formGroup.get(field);
        return !!(control && control.invalid && (control.touched || control.dirty));
    }

    static getFieldErrorMessages(formGroup: FormGroup, field: string): string[] {
        const control = formGroup.get(field);
        const messages: string[] = [];

        if (!control || !control.errors) {
            return messages;
        }

        const errors = control.errors;

        if (errors['required']) {
            messages.push('Este campo es requerido');
        }
        if (errors['fullName']) {
            messages.push(errors['fullName'].message || 'Formato de nombre incompleto');
        }
        if (errors['email']) {
            messages.push('Por favor ingresa un correo válido');
        }
        if(errors['emailTaken']){
            messages.push('Este correo electronico ya ha sido registrado')
        }
        if (errors['minlength']) {
            const requiredLength = errors['minlength'].requiredLength;
            messages.push(`Mínimo ${requiredLength} caracteres`);
        }
        if (errors['pattern']) {
            if (field === 'username') {
                messages.push('Solo se permiten letras y espacios (mín 2 caracteres)');
            } else if (field === 'password') {
                messages.push('La contraseña debe contener al menos un número');
            } else if (field === 'email') {
                messages.push('Por favor ingresa un correo válido');
            } else {
                messages.push('Formato inválido');
            }
        }
        if (errors['passwordMismatch']) {
            messages.push('Las contraseñas no coinciden');
        }


        return messages;
    }

    static getFieldErrorMessage(formGroup: FormGroup, field: string): string {
        const messages = this.getFieldErrorMessages(formGroup, field);
        return messages.length > 0 ? messages[0] : '';
    }

    static markAllAsTouched(form: FormGroup): void {
        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            control?.markAsTouched();
        });
    }
}

export default FormUtils;