import { CreateUserUseCase } from "src/application/use-cases/create-user.usecase";
import { UserRepository } from "src/infrastructure/repository/user.repository";

describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let userRepository: UserRepository;
  
    beforeEach(() => {
      userRepository = { findByEmail: jest.fn(), create: jest.fn() } as any;
      createUserUseCase = new CreateUserUseCase(userRepository);
    });
  
    it('should hash the password before saving the user', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create').mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashed_password' });
  
      const bcryptHashSpy = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password');
  
      await createUserUseCase.execute('test@example.com', 'password123');
  
      expect(bcryptHashSpy).toHaveBeenCalledWith('password123', 10);
    });
  });
  