
export interface UserResponseWithToken {
    id: string;
    email: string;
    name: string;
    created_at: Date;
    last_login: Date;
    login_count: number;
    token: string
  
}
