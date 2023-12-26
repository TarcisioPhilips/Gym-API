import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

interface RegisterUserCaseRequest {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {

    constructor( private usersRepository: any) {

    }

    async execute({ name,  email,  password }: RegisterUserCaseRequest) {
        
        const password_hash = await hash(password, 6) // 6 = rounds
    
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if (userWithSameEmail) {
            throw new Error('E-mail already exists.')
        }
        
        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    
    }
}

