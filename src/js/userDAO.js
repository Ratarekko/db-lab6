import pool from './db.js';

const UserDAO = {
    async getAllUsers() {
        const [rows] = await pool.query('SELECT * FROM User');
        return rows;
    },

    async getUserById(id) {
        const [rows] = await pool.query('SELECT * FROM User WHERE id = ?', [id]);
        return rows[0];
    },

    async createUser({ name, email, password, profilePicture, status }) {
        const [result] = await pool.query(
            'INSERT INTO User (name, email, password, profilePicture, status) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, profilePicture, status]
        );
        return { id: result.insertId, name, email, password, profilePicture, status };
    },

    async updateUser(id, { name, email, password, profilePicture, status }) {
        await pool.query(
            'UPDATE User SET name = ?, email = ?, password = ?, profilePicture = ?, status = ? WHERE id = ?',
            [name, email, password, profilePicture, status, id]
        );
        return { id, name, email, password, profilePicture, status };
    },

    async deleteUser(id) {
        await pool.query('DELETE FROM User WHERE id = ?', [id]);
        return { message: `User with ID ${id} deleted` };
    },
};

export default UserDAO;
