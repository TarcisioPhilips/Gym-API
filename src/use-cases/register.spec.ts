import { expect, describe, it} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'



describe('Register User Case', () =>{
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUserCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUserCase.execute({
            name: 'John Doe',
            email:'jonhdoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUserCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUserCase.execute({
            name: 'John Doe',
            email:'jonhdoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectHashed = await compare('123456',user.password_hash)

        expect(isPasswordCorrectHashed).toBe(true)
    })

    

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUserCase = new RegisterUseCase(usersRepository)

        const email = 'jonhdoe@example.com'

       await registerUserCase.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })

        expect(() => 
            registerUserCase.execute({
                name: 'John Doe',
                email,
                password: '123456'
            })
            ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})