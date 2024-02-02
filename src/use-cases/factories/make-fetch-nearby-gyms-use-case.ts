import { FetchNearbyGymsUseCase } from "../featch-nearby-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gym-repository"

export function makeFetchNearbyGymsUseCase() {
    const gymRepository = new PrismaGymsRepository() 
    const useCase = new FetchNearbyGymsUseCase(gymRepository)

    return useCase
}