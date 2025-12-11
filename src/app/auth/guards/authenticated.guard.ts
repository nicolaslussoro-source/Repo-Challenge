import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { firstValueFrom } from 'rxjs';

export const AuthenticatedGuard: CanMatchFn = async(
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkUser())

    if ( !isAuthenticated ) {
        router.navigateByUrl('/login')
        return false
    }

    return true;
}