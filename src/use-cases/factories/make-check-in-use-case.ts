import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gym-repository"
import { PrismaCheckInsRespository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckInUseCase } from "../check-in"

export function makeCheckInUseCase () {
    const CheckInsRepository = new PrismaCheckInsRespository() 
    const gymsRepository = new PrismaGymsRepository()
    
    const useCase = new CheckInUseCase(CheckInsRepository, gymsRepository)

    return useCase
}