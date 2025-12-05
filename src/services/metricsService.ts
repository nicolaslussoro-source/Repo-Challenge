import pool from '../db';


export async function getUser(email: string): Promise<{ id: string; email: string; name: string; created_at: string | null; last_login: string | null; login_count: number } | null> {
    const rows = await pool.query('SELECT id, name, email, created_at, last_login, login_count FROM users WHERE email = ?', [email])
    const results: any[] = Array.isArray(rows) ? rows as any[] : [];
    const user = results[0];
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at ? new Date(user.created_at).toISOString() : null,
      last_login: user.last_login ? new Date(user.last_login).toISOString() : null,
      login_count: user.login_count || 0
    };
}

export async function getAllUsers(): Promise<Array<{ id: string; email: string; name: string; created_at: string | null; last_login: string | null; login_count: number }>> {
    const rows = await pool.query('SELECT id, name, email, created_at, last_login, login_count FROM users');
    const results: any[] = Array.isArray(rows) ? rows as any[] : [];
    return results.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at ? new Date(user.created_at).toISOString() : null,
      last_login: user.last_login ? new Date(user.last_login).toISOString() : null,
      login_count: user.login_count || 0
    }));
}
