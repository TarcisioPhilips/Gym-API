import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { error } from "console"

interface RegisterUserCaseRequest {
    name: string
    email: string
    password: string
}

export async function registerUserCase({
    name,
    email,
    password
}: RegisterUserCaseRequest) {
    
    const password_hash = await hash(password, 6) // 6 = rounds

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        throw new Error('E-mail already exists.')
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })

}