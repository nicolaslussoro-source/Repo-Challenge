import { get } from 'http';
import pool from '../db';
import { UserResponse } from '../interfaces/UserResponse.interface';
import { getAllUsers, getUserByEmail } from '../repository/metrics.repository';


export async function getUser(email: string): Promise<UserResponse | null> {
    const user = await getUserByEmail(email);
    if (!user) return null;
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    };
}

export async function getUsers(): Promise<UserResponse[]> {
    const users = await getAllUsers();
    return users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
        last_login: user.last_login,
        login_count: user.login_count
    }));
}
