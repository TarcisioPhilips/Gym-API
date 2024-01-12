import { expect, describe, it} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'



describe('Register User Case', () =>{
    it('should hash user password upon registration', async () => {
        const registerUserCase = new RegisterUseCase({
            async findByEmail(email){
                return null
            },
            
            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                }
            },
        })

        const {user} = await registerUserCase.execute({
            name: 'John Doe',
            email:'jonhdoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectHashed = await compare('123456',user.password_hash)

        expect(isPasswordCorrectHashed).toBe(true)
    })
})