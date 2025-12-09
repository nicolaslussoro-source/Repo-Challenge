export interface User {
    id: string;
    email: string;  
    name: string;
    password_hash: string;
    created_at: Date;
    last_login: Date;
    login_count: number;
}