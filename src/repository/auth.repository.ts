import  pool  from '../db';
import { User } from '../interfaces/User.interface';

export async function getLoginUser(email: string): Promise<User | null> {
    const rows = await pool.query('SELECT id, name, email, password_hash, created_at, last_login, login_count FROM users WHERE email = ?', [email])
    const results: any[] = Array.isArray(rows) ? rows as any[] : [];    
    const user = results[0];
    if (!user) return null
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

export async function actualizarLoginInfo(id: string): Promise<void> {
    await pool.query('UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = ?', [id]);
}

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

export async function insertUser(id: string, name: string, email: string, password_hash: string): Promise<void> {
    await pool.query(
        'INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)',
        [id, name, email, password_hash]
    );
}

export async function getUserById(id: string): Promise<User | null> {
    const rows = await pool.query('SELECT id, name, email, password_hash, created_at, last_login, login_count FROM users WHERE id = ?', [id])
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