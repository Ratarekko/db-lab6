import pool from './db.js';

const ProjectDAO = {
    async getAllProjects() {
        const [rows] = await pool.query('SELECT * FROM Project');
        return rows;
    },

    async getProjectById(id) {
        const [rows] = await pool.query('SELECT * FROM Project WHERE id = ?', [id]);
        return rows[0];
    },

    async createProject({ name, description }) {
        const [result] = await pool.query(
            'INSERT INTO Project (name, description) VALUES (?, ?)',
            [name, description]
        );
        return { id: result.insertId, name, description };
    },

    async updateProject(id, { name, description }) {
        await pool.query(
            'UPDATE Project SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );
        return { id, name, description };
    },

    async deleteProject(id) {
        await pool.query('DELETE FROM Project WHERE id = ?', [id]);
        return { message: `Project with ID ${id} deleted` };
    },
};

export default ProjectDAO;
