import { pool } from "../config/db";

export interface IUser {
    id?: number;
    name: string;
    email: string;
    phone: string;
    role?: "admin" | "customer";
}


export const getAllUsers = async () => {
    const result = await pool.query("SELECT id, name, email, phone, role FROM users");
    return result.rows;
};

export const getUserById = async (userId: number) => {
    const result = await pool.query(
        "SELECT id, name, email, phone, role FROM users WHERE id=$1",
        [userId]
    );
    return result.rows[0];
};

export const updateUser = async (userId: number, data: Partial<IUser>) => {
    const fields: string[] = [];
    const values: any[] = [];
    let i = 1;

    for (const key in data) {
        fields.push(`${key}=$${i}`);
        values.push((data as any)[key]);
        i++;
    }

    const result = await pool.query(
        `UPDATE users SET ${fields.join(", ")} WHERE id=$${i} RETURNING id, name, email, phone, role`,
        [...values, userId]
    );

    return result.rows[0];
};

export const deleteUser = async (userId: number) => {
    await pool.query("DELETE FROM users WHERE id=$1", [userId]);
    return true;
};
