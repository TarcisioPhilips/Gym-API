import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}


export class AuthenticateUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({
        email, 
        password
    }: AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse> {
        // buscar usuário no banco pelo email
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        // comparar senha salva com a senha do parametro
        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}