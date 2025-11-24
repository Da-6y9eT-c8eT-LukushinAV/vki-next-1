import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';
import { User } from './entity/User.entity';
import { createTestUsers } from './userDb';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web.db', // Path to your SQLite database file
  entities: [Group, Student, User],
  synchronize: true, // Auto-create schema on startup (use with caution in production)
  logging: false,
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
// const init = async (): Promise<void> => {
//   try {
//     await AppDataSource.initialize();
//   }
//   catch (error) {
//     console.log(error);
//   }
// };

// init();

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    // Создаем тестовых пользователей
    await createTestUsers();
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default AppDataSource;
