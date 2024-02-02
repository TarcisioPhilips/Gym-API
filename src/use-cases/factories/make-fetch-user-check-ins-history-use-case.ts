import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"
import { PrismaCheckInsRespository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeFetchUsersCheckInsHistoryUseCase () {
    const CheckInsRepository = new PrismaCheckInsRespository() 
    const useCase = new FetchUserCheckInsHistoryUseCase(CheckInsRepository)

    return useCase
}