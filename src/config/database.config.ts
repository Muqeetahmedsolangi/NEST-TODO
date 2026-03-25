export default () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'todo_user',
    password: process.env.DB_PASSWORD || 'todo123',
    name: process.env.DB_NAME || 'todo_db',
  },
});
