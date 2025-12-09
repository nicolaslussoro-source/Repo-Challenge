import pool from "../db";
import { User } from "../interfaces/User.interface";


export async function getUserByEmail(email: string): Promise<User | null> {
    const rows = await pool.query('SELECT id, name, email, password_hash, created_at, last_login, login_count FROM users WHERE email = ?', [email])
    const results: any[] = Array.isArray(rows) ? rows as any[] : [];    
    const user = results[0];
    if (!user) return null;
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        password_hash: user.password_hash,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    };
}

export async function getAllUsers(): Promise<User[]> {
    const rows = await pool.query('SELECT id, name, email, password_hash, created_at, last_login, login_count FROM users');
    const results: any[] = Array.isArray(rows) ? rows as any[] : [];
    return results.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        password_hash: user.password_hash,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    }));
}