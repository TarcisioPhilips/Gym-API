import { Gym, Prisma } from "@prisma/client";

export interface findmanyNearbyParams {
    latitude: number;
    longitude: number
}
export interface GymsRepository{
    findById(id: string): Promise<Gym | null>
    findmanyNearby(params: findmanyNearbyParams): Promise <Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    searchMany(query:string,page:number): Promise<Gym[]>
}