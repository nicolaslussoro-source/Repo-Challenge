import { Routes } from "@angular/router";
import AuthLayout from "./layouts/auth-layout/auth-layout";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";
import { AuthenticatedGuard } from "./guards/authenticated.guard";

export const authRoutes: Routes = [
    { 
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/auth-login-page/auth-login-page'),
                canMatch: [ NotAuthenticatedGuard, ]
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/auth-register-page/auth-register-page'),
                canMatch: [NotAuthenticatedGuard, ]
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/auth-me-page/auth-me-page'),
                canMatch: [AuthenticatedGuard]
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]


     }
];

export default authRoutes;