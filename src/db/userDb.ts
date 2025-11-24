import AppDataSource from './AppDataSource';
import { User } from './entity/User.entity';
import * as bcrypt from 'bcryptjs';

export const createTestUsers = async (): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  // Проверяем, есть ли уже пользователи
  const existingUsers = await userRepository.count();
  if (existingUsers > 0) {
    console.log('Test users already exist');
    return;
  }

  // Создаем тестовых пользователей
  const testUsers = [
    {
      email: 'admin@test.com',
      password: await bcrypt.hash('admin123', 10),
      firstName: 'Админ',
      lastName: 'Админов',
      middleName: 'Админович',
    },
    {
      email: 'user@test.com',
      password: await bcrypt.hash('user123', 10),
      firstName: 'Пользователь',
      lastName: 'Пользователев',
      middleName: 'Пользователевич',
    },
  ];

  for (const userData of testUsers) {
    const user = userRepository.create(userData);
    await userRepository.save(user);
  }

  console.log('Test users created successfully');
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOne({ where: { email } });
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

