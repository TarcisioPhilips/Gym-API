import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      title : 'Javascript Gym',
      description: '',
      phone:'',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  });

  afterEach(()=>{
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const {checkIn} = await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.228119939219653,
        userLongitude: -45.88862731382569,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.228119939219653,
        userLongitude: -45.88862731382569,
    });

    await expect(() =>
       sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.228119939219653,
        userLongitude: -45.88862731382569,
    }),
    ).rejects.toBeInstanceOf(Error);
  });

  
  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.228119939219653,
        userLongitude: -45.88862731382569,
    });
  
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

  
    const {checkIn} = await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.228119939219653,
        userLongitude: -45.88862731382569,
    })
    expect(checkIn.id).toEqual(expect.any(String));

  });

});
